function foo (){
  console.log(this)
}

let obj = {
    name: 'foo',
    foo: foo
}

obj.foo()