export class If{
    constructor(c, name="no name"){
        this.condition = c
        this.name = name
    }
    Then(thenpart){
        const l1 = {timeline:thenpart, conditional_function : () => {
            var out = this.condition()
            //console.log(this.name)
            //console.log(out == true)
            return out == true
        }}
        return new Then(this.condition,[l1],this.name)
    }
}
class Then{
    constructor(c, args, name="no name")
    {
        this.condition = c
        this.args = args
        this.name = name
    }
    Else(elsePart){
        const l2 = {timeline:elsePart, conditional_function :() => {
            var out = this.condition()
            //console.log("not")
            //console.log(this.name)
            //console.log(!out) 
            elsePart.annotation="ElsePart"
            //console.log(elsePart) 
            return !out
        }}
        return [this.args[0],l2]
    }
}