class Animal {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  speak() {
    console.log(`${this.name} makes a noise.`);
  }
}

class Dog extends Animal {
  constructor(name, age) {
    super(name, age);
  }
}

const dog = new Dog("Rex", 5);

function ws(animal) {
  console.log(dog.speak());
}

ws(dog);