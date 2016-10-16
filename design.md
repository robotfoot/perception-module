#Initial Design

##Hardware

We'll be using the [Portable Kinect](http://big.cs.bris.ac.uk/projects/mobile-kinect) solution developed at University of Bristol. This will allow us to keep the actual module light, and so any/all processing on a hub computer over wifi.

- Kinect
- Raspberry PI 3
- MicroSD/Flash Drive/SDCard for raspberry pi
- Battery for all
- Hub computer for processing
- Platform/structure to hold both in place as module


##Software

All software will use ROS.

###Conception system

The conception system will run segmentation and store the results. It will then run unsupervised clustering learning to attempt to generalize. If it finds a pattern that generalizes well to a group, it will store that pattern, and ask the semantic system to attempt to describe it.

> TODO: How to identify and describe continuous objects? Ocean, grass, forest, road, etc.

###Perception system

This will actually have a few subsystems:

#### Segmentation subsystem

This will continuously scan the point clouds and attempt to segment them.

#### Recognition subsystem

Given segments, attempt to match to existing patterns.

###Semantic system

Given a pattern from the conception subsystem, the semantic system will attempt to describe it in words. This might use supervised learning?
