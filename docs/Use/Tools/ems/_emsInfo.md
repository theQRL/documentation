

## Key Encryption

A public-key encryption scheme PKE = (KeyGen, Enc, Dec) is a triple of probabilistic algorithms together with a message space M. 

- The key-generation algorithm KeyGen returns a pair (pk, sk) consisting of a public key and a secret key. 
- The encryption algorithm Enc takes a public key pk and a message m ∈ M to produce a ciphertext c. 
- Finally, the deterministic decryption algorithm Dec takes a secret key sk and a ciphertext c, and outputs either a message m ∈ M or a special symbol ⊥ to indicate rejection.

## Key Encapsulation

A key-encapsulation scheme KEM = (KeyGen, Encaps, Decaps) is a triple of probabilistic algorithms together with a key space K. 

- The key-generation algorithm KeyGen returns a pair (pk, sk) consisting of a public key and a secret key. 
- The encapsulation algorithm Encaps takes a public key pk to produce a ciphertext c and a key K ∈ K. 
- Finally, the deterministic decapsulation algorithm Decaps takes a secret key sk and a ciphertext c, and outputs either a key K ∈ K or a special symbol ⊥ to indicate rejection.


> (Note that full forward secrecy is not achievable for a two-round authenticated key-exchange protocol [27].)