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
$ meteor add rocketchat:federationclient1 (For one Rocket.Chat instance)
$ meteor add rocketchat:federationclient2 (For another Rocket.Chat)
$ meteor npm start or meteor run  --port 8181 (run two instances simultaneously)
$ (open another two terminals) node client1.js && node client2.js
```


### ScreenShots

![ScreenShot-1](https://github.com/madguy02/RocketNode/blob/develop/screenshot-1.png)
![ScreenShot-2](https://github.com/madguy02/RocketNode/blob/develop/screenshot-2.png)
![ScreenShot-3](https://github.com/madguy02/RocketNode/blob/develop/screenshot-3.png)


### Future Roadmap

- [ ] Build a better Client.
- [ ] The UI or the particular channel to which the message is intended has to be updated.
- [ ] Replace the locally created logs with something more durable and fault tolerant (Looking at Kafka).
- [ ] Add some UI to the Client.
- [ ] Make the Server send the requests and route them properly (Ongoing Experiment).
- [ ] Add Encryption, to avoid EavesDropping (TBD).


### Next immediate Step

- [ ] Integrate Hubot to update messages to the intended channel

### Note:

Developers are welcome to support this experimentation project, figure out the weaknesses and provide solutions for it.
Contributions are required from all those Talented Developers in the world and make something awesome together :)
