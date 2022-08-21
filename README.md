# Course-2
Getting Started with Solana using Javascript

Each challenge will contain a file with my thoughts during the challenge. some small some bigger. These files are just notes. I tried to summarize the key points in here

# Overal feedback:
Though I think the module was great, and teaches the basics for the web3 functionality. I can see both current and future attendees having some issues:
The module kind a has a prerequisite on JS, TS, Rust and React knowledge since the setup of the projects was really skimped over. I did experience with this on challenge 4 especially. When the code from the vid didn't work since BPF doesn't exist for Windows as of the moment of typing. My first point of feedback would be: Make this course about web3 and not a painfull research on how to setup an example project to experience web3.

This means, make a guide for installing the project and making it work until the moment where you have te edit code.
I would do this for each new type of project (plain js, plain ts, react, rust) when it first appears during the course. And I would do this for
- Windows
- Linux(Debian/Ubuntu)
- MacOS

To be on the safe side, also paste in code after you setup and see or it runs. During challenge 5, window.buffer decided to throw a really anoying exception

The second point of improvement I would like to contribute is simplification. It's called Getting started ** using Javascript. Yet it is:
Getting started ** using Javascript, Typescript and React
In my opinion this is more complex then is. What I would remove the Javascript part entirely, and also in challenge 2 remove the Javascript notation of functions. Keep 1 standard and also explain it.

With explaining things I mean:
First import, explain that an import is used to call code which exists outside of the current file. If the part between {} has a red underline it means that it can't find the object at the destination. Usually a typo or outdated package. If the part behind the from has a red line. It means the destination didn't exist. if using a package did you run npm install (package name)

or

This is a function, and quick explanation on export, async, functionName, parameters & typing, return & typing

If you want to target a wider audience, this would lower the prerequisites of your audience. I would love seeing incode tutorial for Rust haha

# Unsaited curiosities
Challenge 2
Isn't it bad that we call new KeyPair over and over again? I think this means that everytime we make a new solana account. OR does it clean up after runtime? or does devenet have some cleanup rules

Challenge 4
When we create the greetedPubKey we pass along the programId. This is done to allow this key to write to the program.
- This is a bit confusing, does this mean that if I have the ID of a program I can mutate it live? Wouldn't that be a huge vurnability to allow people to change it without redeploying?
- Isn't it more likely that this would allow the account to interact with the program? Which again doens't quite fit the picutre since by signing an approve you can interact with any program on chain I think?
/\ I think I confused instruction with program. And what you can modify is the instruction you sent to the program. not the program itself. but happy to discuss this.

Resources used to run a program is actually RENT not Gas Fee. getMinimumBalanceForRentException will return rent needed. uses program length to determine this
  - This is confusing to me. If we make an account which code does: for(var i = Number.MIN_SAFE_INTEGER; i < Number.MAX_SAFE_INTEGER; i++) { // something small }. My size would be small but the workload big. Do we not pay for this?
- Also using array parameters for your constructions and mapping them in the program would save a lot?
