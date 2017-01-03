## Doc generators

This is a complete quick and dirty solution for
automatic rendering the libraries API.

If you check the code you are going to have nightmares but I didn't
have the time to put it all together correctly and it serves it's purpose.

Contributions and clean up are more than welcome.

We use the json output of `type-doc` and render some stuff with that.


### TODO

- Instead of passing around several parameters we should have a context object that contains useful value, for example
  - level of indentation
  - inline
  - etc
- Use typescript for better sanity and semantics (only if ...Arr is supported inside an array)
- Move back all the functions to a single file to avoid nasty inline `require` to avoid circular dependencies. The nature of this all is recursive so no need to circle that point
