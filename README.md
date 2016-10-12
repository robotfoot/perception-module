# General Purpose Perception Module

*Perception is the process of taking raw sensory data, and mapping it to concepts. Humans are experts at perception: They are constantly awash in raw data, and are able to quickly associate this incoming deluge with abstractions such as cars, people, events, and all manner of useful, daily concepts. Robots, as of the writing of this paper, are somewhat limited in their ability to perceive. Machine learning and pattern matching technique have provided many tools to facilitate machine perception, but they are typically too specialized for general use, and must be specially configured for each unique application. In addition, the nature of the inputs for these techniques are typically not similar to those of the human sensorium. This paper will outline the design and prototype of a general purpose perception module that can perform sensory association similar to that of a human. By incorporating this module, roboticists can interact with their robots using high-level, human concepts, including natural language. This capability has the potential to may accelerate the development of useful robotic applications.*

##Introduction

Machine learning is a field of study concerned with learning from data. There are two main techniques for learning from data: classification and regression. Classification is the task of, given an input, to what output class should we associate it? Regression is more direct: Given a series of inputs, can we predict the next value?

A classic example of machine learning is classifying a number in an image. The inputs for this tasks are small images of numbers, and the output classes are the digits `0-9`. Usually we are given a set of *training data*, which is a set of images that have been already associated with a number `0-9`. We typically derive one or more *features* from the input data, with which we will train on. Some features that are typically used for this example are average position of all black pixels, variance of all black pixels, etc. Then, we calculate these features for each training image, and *train* our learning algorithm using the features as inputs, and the known output class as well. Once trained, we can run our learning algorithm on our *test data*, and compare the performance to the correct answers.

The field of machine learning is concerned primarily with finding associations between input data and classifications, and using these patterns to predict or classify the data through *generalization*.

Typical tasks for machine learning are predicting what movies a person may enjoy based on previous watched movies, classifying letters from an image, and selecting insurance rates from 

There are three main branches of machine learning: **Supervised learning**, **Unsupervised learning**, and **Reinforcement learning**.

#Perception

##Concepts and Patterns

###Object Recognition and Perception

####Visual Perception in 3D

####General Perception in 4D

###Machine Learning and Perception

##Information Theory and Perception

#Conception

#Abstract and Higher Level Thought
