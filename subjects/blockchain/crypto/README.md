# Crypto

_When in doubt, use brute force. - Ken Thompson_

Today , we will learn the fundamentals of cryptography that underlies all blockchain projects. We will practice binary variables, hash functions and digital signatures. By the end of the quest, you should be able to create a basic wallet to generate keys, store them and sign transaction.

Buffers are a builtin type in nodejs used to represent binary objects. You create a buffer from any object by using the function `Buffer.from()`. As usual in JavaScript there are a lot of implicit conversions. Be aware for instance that a string representing a number is different from the actual number.

For cryptography, you may have heard how it is used the encryption and decryption of messages. While this is often true, in the blockchain and cryptoassets industries this is not how we will primarily use it. The two families of algorithms we will see are:

**Cryptographic hash** functions are algorithms that take as input any data and produce an unique fingerprint of this data. Those functions are meant to be fast, one way, deterministic.

**Digital signatures** allow to identify the author of a message. It relies on asymmetric cryptography. You first generate randomly a key pair with a public key and a private key. The public key is shared publicly. The private key will allow you to sign a message. More precisely the hash of this message. The public key will allow anyone to verify that this message was properly signed.

From a practical point of view, for today, you only need the builtin library `crypto`.

### **Content**

## Mandatory

1. `Increment` _Binary variables in nodejs_
2. `Hash File` _Hash functions, file read in nodejs_
3. `Hash 160` _Hash functions, double hash, sha256, Ripemd160_
4. `Semi Brute` _Hash bruteforce_
5. `Signer` _ECDSA_

### Optional

6. `Generate Address` _Key generation, Crypto address_
7. `Basic Wallet` _Key storage, transaction signature_

### Integration:

Launch tests with

```sh
node test.mjs <exercices>
```
