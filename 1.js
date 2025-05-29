class Father {
  name; age; tool;
    constructor(name, age, tool) {
        this.name = name;
        this.age = age;
        this.tool = tool;
    }
}

class Son {
  tool;
  constructor(tool) {
    this.tool = tool
  }
    
}

let tool = {name: 'kit', type: 'map'}
const f = new Father('zvos', 18, tool)
const s = new Son(tool)

console.log(f.tool === s.tool)