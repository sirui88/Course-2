For cohort 0 I think we're all devs. However in the future I would also make an optional resource available on how to fullfill the prerequisits.

Think the explanation of async "it's because we are fetching data" is a bit short, and inaccurate. if we going to talk about async we should at least mention threading and blocking

Isn't it bad that we call new KeyPair over and over again? I think this means that everytime we make a new solana account. OR does it clean up after runtime? or does devenet have some cleanup rules

the `confirmTransaction` function is deprecated in current version of the package (1.52.0). I'd say that we should keep this sort of stuff up to date. If not future people will be forced to either have the code not compile or use an older version of the package. Which could have security vurnabilities
^ Ah this is explained in challenge 2.

Notes:
Lamports: is the smallest unit  of measurment in Solana 0.000000001 SOL (8 zeroes)
  So to convert a balance you should devide it by the `LAMPORTS_PER_SOL` if it should be humanly readable
