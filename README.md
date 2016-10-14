# General Purpose Perception Module

*Perception is the process of taking raw sensory data, and mapping it to concepts. Humans are experts at perception: They are constantly awash in raw data, and are able to quickly associate this incoming deluge with abstractions such as cars, people, events, and all manner of useful, daily concepts. Robots, as of the writing of this paper, are somewhat limited in their ability to perceive. Machine learning and pattern matching technique have provided many tools to facilitate machine perception, but they are typically too specialized for general use, and must be specially configured for each unique application. In addition, the nature of the inputs for these techniques are typically not similar to those of the human sensorium. This paper will outline the design and prototype of a general purpose perception module that can perform sensory association similar to that of a human. By incorporating this module, roboticists can interact with their robots using high-level, human concepts, including natural language. This capability has the potential to may accelerate the development of useful robotic applications.*

##Introduction

Robotics is a mature field, the term having been coined in the middle of the 20th century. Robots are now prevalent in factory settings worldwide, and in certain telemetrically-controlled service-related roles. 

However, robots have not progressed to the point where they are autonomously useful for any tedious or dangerous physical, service-based tasks. Successful robots are typically limited to very specific applications in static environments, which restricts them to factory or highly controlled settings. 

There are several reasons for this lack of capability, but the most salient hurdle to creating useful service robots is the lack of general adaptability. In particular, robots are unable to learn and associate simple concepts that humans take for granted.

The most convincing evidence for this conclusion is that there exists many 
