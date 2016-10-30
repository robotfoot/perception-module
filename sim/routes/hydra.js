var express = require('express');
var router = express.Router();
var http = require('http');
var request = require('request');

var api_key = "621451be1ee84eeea8f852cb809cd307";
var hydra_url = "https://api.hydra.agoragames.com";
var hydra_auth_headers = {
	'x-hydra-api-key': api_key
};

var red_clan_id = "5813a7bf110d5c424b742e79";
var blue_clan_id = "5813a7cfac801d0a78a0451a";
var hydra_headers;

function get_auth(callsign, callback){
  var options = {
		url: hydra_url + "/auth",
		headers: hydra_auth_headers,
		method: "POST",
		json: {"UUID": callsign}
	};

	function success_auth(error, response, body){
		console.log("Auth: " + body.token);
		callback(body.token);
	}

	request(options, success_auth);
}

function get_access_token(auth_token, callback){
  var options = {
		url: hydra_url + "/access",
		headers: hydra_auth_headers,
		method: "POST",
		json: {"auth_token": auth_token}
	};

	function success_access(error, response, body){
		console.log("Access: " + body.token);
		callback(body.token);
	}

	request(options, success_access);
}

function join_clan(access_token, callback){
	headers = {
		'x-hydra-api-key': api_key,
		'x-hydra-access-token': access_token
  }

  var options = {
		url: hydra_url + "/clans/fps/" + red_clan_id + "/members/me/join",
		headers: headers,
		method: "PUT"
	};

	function success_join(error, response, body){
		callback(body);
		console.log("Joined red clan!");
	}

	request(options, success_join);
}

function increment_shots_fired(access_token, shotsFired){
	headers = {
		'x-hydra-api-key': api_key,
		'x-hydra-access-token': access_token
  }

  var options = {
		url: hydra_url + "/clans/fps/" + red_clan_id + "/members/me",
		headers: headers,
		method: "PUT",
		json: {'data': {'shots': shotsFired}}
	};

	function success_join(error, response, body){
		console.log(response);
	}

	request(options, success_join);

}

router.get('/incrementShotsFired/:access_token/:shotsFired', function(req, res, next) {
  var access_token = req.params.access_token;
  var shotsFired = req.params.shotsFired;
	increment_shots_fired(access_token, shotsFired);
});

router.get('/join/:callsign', function(req, res, next) {

	callsign = req.params.callsign;
	get_auth(callsign, (auth_token) => {
		get_access_token(auth_token, (access_token) => {
			join_clan(access_token, (response) => {
					res.send({
						'access_token': access_token
					});
				});
			});
		});
});

module.exports = router;
