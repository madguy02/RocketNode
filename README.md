# Description of the Experiment

This experimentation is being started keeping in mind to implement the federation capability of Rocket.Chat. Currently this is the very first stage of the project and the code is also written very crudely, with mostly static messages to be passed from Server to Server.

The very name 'RocketNode' comes from the idea of having extra client nodes, which a user can set up to connect to the TCP server running within Rocket.Chat.


# Working

  - The server opens up a TCP port, acting as a package inside Rocket.Chat
  - The client is then set up, which connects to the TCP port of the server.
  - Lets say we have two instances (RC1 --> client1 &&  RC2  --> client2)
  - Client1 forms a message and sends to RC2 instance, which RC2 writes down to a file (now locally) and the client2 (attached to RC2) reads the message and updates the client2 .
  - Similarly , vice versa.


### Installation & Running

```sh
$ meteor add rocketchat:federationclient (for instances trying to be federated)
$ start rocketnode.js separately for servers(trying to federate)
$ change the tcp port on the federationclient package and rocketnode.

```


### ScreenShots
![ScreenShot--1](https://github.com/madguy02/RocketNode/blob/develop/Architecture-itr-2.PNG)
![ScreenShot-0](https://github.com/madguy02/RocketNode/blob/develop/Architecture.PNG)
![ScreenShot-1](https://github.com/madguy02/RocketNode/blob/develop/Screenshot-server-starts-1.png)
![ScreenShot-2](https://github.com/madguy02/RocketNode/blob/develop/Screenshot-server2-starts.png)
![ScreenShot-3](https://github.com/madguy02/RocketNode/blob/develop/Screenshot-client1-send-message.png)
![ScreenShot-4](https://github.com/madguy02/RocketNode/blob/develop/Screenshot-client2-send-message.png)
![ScreenShot-5](https://github.com/madguy02/RocketNode/blob/develop/Screenshot-client1.png)
![ScreenShot-6](https://github.com/madguy02/RocketNode/blob/develop/Screenshot-federation-msg.png)



### Future Roadmap

- [ ] Build a better Client.
- [ ] The UI or the particular channel to which the message is intended has to be updated.
- [ ] Replace the locally created logs with something more durable and fault tolerant (Looking at Kafka).
- [ ] Add some UI to the Client.
- [ ] Make the Server send the requests and route them properly (Ongoing Experiment).
- [ ] Add Encryption, to avoid EavesDropping (TBD).
- [ ] Moving with olm, implemented by matrix (TBD).



### Next immediate Step

- [ ] Join a Room from Server1 to Server2
- [ ] UI work on Rocket.Chat platform, for federation messages to display.
- [ ] Structuring of JSON messages.
- [ ] RocketNode automatically query connected server information.
- [ ] Implementation of Concensus to rocketnode and RC server.


### Instruction

If you are willing to implement on instances other than localhosts, you will need to have a static IP address for the
other server to find that instance.


### Weaknesses

- Leaky Buffers
- Fault intolerant
- Not Robust at all
- The client depends on the connection to the server

### Thoughts on ZeroMQ

The idea of implementing  ZeroMQ is still undecided, although according to tests, i think its good enough to solve a few of the problems or weaknesses mentioned above ( But its still TBD)

### Note:

Developers are welcome to support this experimentation project, figure out the weaknesses and provide solutions for it.
Contributions are required from all those Talented Developers in the world and make something awesome together :)

