# Description of the Experiment

This experimentation is being started keeping in mind to implement the federation capability of Rocket.Chat. Currently this is the very first stage of the project and the code is also written very crudely, with mostly static messages to be passed from Server to Server.

The very name 'RocketNode' comes from the idea of having a federation node, which actually will be responsible for the federation of Rocket.Chat, apart from that we require to maintain a package within the RC server for a tcp connection that lets the rocketnode connect to the server.


# Working

  - The server opens up a TCP port, acting as a package inside Rocket.Chat
  - The rocketnode is then run externally(as of now), which connects to the TCP port of the server.
  - Lets say we have two instances (RC1 --> rocketnode1 &&  RC2  --> rocketnode2)
  - The nodes although are connected to respective servers, also exists as Peer in a connection pool.
  - The topology we implemented is a p2p(fully connected topology) .
	- Further plan is to replace it with a mesh topology for better node discovery .



### Installation & Running

```sh
$ Run two instances of Rocket.Chat (meteor run --port 5001 && meteor run --port 8181
$ meteor add rocketchat:federationclient (add to both thr instances)
$ open up another terminal and ```node rocketnode.js localhost:4001 localhost:4002 && again node rocketnode.js localhost:4002 localhost:4001

 ``` 
.

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

- [ ] Set up rocketnode to do dns discovery for other nodes.
- [ ] Implementation of Concensus to rocketnode and RC server.
- [ ] Add Encryption, to avoid EavesDropping.
- [ ] Moving with olm, implemented by matrix.
- [ ] Improve code quality.



### Next immediate Step

- [ ] Join a Room from Server1 to Server2 using rocketnode (partially achieved)
- [ ] Figure out a DHT network.
- [x] Implementation of a peer to peer network between rocketnodes.
### Instruction

If you are willing to implement on instances other than localhosts, you will need to have a static IP address for the
other server to find that instance.


### Weaknesses

- Leaky Buffers
- Fault intolerant (fault tolerance is partly achieved)
- Not Robust at all (Still under planning and discussion)
- The client depends on the connection to the server (Fixed)

### Thoughts on ZeroMQ

The idea of implementing  ZeroMQ is still undecided, although according to tests, i think its good enough to solve a few of the problems or weaknesses mentioned above ( But its still TBD)

### Note:

Developers are welcome to support this experimentation project, figure out the weaknesses and provide solutions for it.
Contributions are required from all those Talented Developers in the world and make something awesome together :)

