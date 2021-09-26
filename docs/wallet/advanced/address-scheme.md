

An extensible stateful asymmetrical hypertree signature scheme composed of chained XMSS trees is pro-
posed. This has the dual benefit of utilising a validated signature scheme and allowing generation of ledger addresses with the ability to sign transactions avoiding a lengthy pre-computation delay seen with giant
XMSS constructions. W-OTS+ is the chosen hash-based one-time signature in the scheme for both security
and performance reasons.

A QRL address is designed to be extensible and supports a wide range of formats. The first three bytes of any address (descriptor) encode information to describe the hash function, signature scheme, address format, and additional parameters. 
