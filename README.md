<h1 align="center">
  <br>
  <img src="images/solar-systen-demo.gif" alt="solar-system" width="500"></a>
  <br>
  solar-system
  <br>
</h1>

<h4 align="center">A simple solar system simulation.</h4>
## 🛠️ Build

```
wasm-pack build --release --no-typescript
cd www
npm install
```

## 🚴 Run
```
cd www
npm run start
```

## ✨ Features

While running the simulation, following keybindings can used to interact:

* `Arrow Up` - Increases simulation speed
* `Arrow Up` - Reduces simulation speed
* `Space` - Pauses / Continues simulation
* `T` - Enables / Disables textures
* `L` - Enables / Disables lightning

## 🔬 Test

```
wasm-pack test --headless --firefox
```

## 📚 Documentation

```
cargo doc --no-deps --target-dir docs/wasm
cd www
npm run doc
```

## Sources
* [Three.js](https://threejs.org/)
* [Textures](https://www.solarsystemscope.com/textures/)
* [Orbit lines](https://stackoverflow.com/questions/42087478/create-a-planet-orbit)
* [Rotation](https://codepen.io/cl4ws0n/pen/eJjQzx?editors=1010)
* [Earth-Moon Rotation](https://mattloftus.github.io/2016/02/03/threejs-p2/)
* [Switch Controls](https://stackoverflow.com/questions/11304998/switch-threejs-controls-from-trackball-to-flycontrols-and-vice-versa)

## License

MIT

---

> GitHub [kurbaniec](https://github.com/kurbaniec-tgm) &nbsp;&middot;&nbsp;
> Mail [at.kacper.urbaniec@gmail.com](mailto:at.kacper.urbaniec@gmail.com)