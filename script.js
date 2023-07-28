'use strict';

const Person = function(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
}

const aakash = new Person('Aakash', 1999);
console.log(aakash);
console.log(aakash instanceof Person);

Person.prototype.calcAge = function() {
    return 2039 - this.birthYear;
}

console.log('aakash age: ' + aakash.calcAge());
console.dir(Person.__proto__);

/****** CODING CHALLENGE #1 ******/

const Car = function(make, speed) {
    this.make = make;
    this.speed = speed;
}

Car.prototype.accelerate = function() {
    this.speed += 10;
    console.log(this.speed);
}

Car.prototype.brake = function() {
    this.speed -= 5;
    console.log(this.speed);
}

const bmw = new Car('BMW', 120);
const mercedes = new Car('Mercedes', 95);

bmw.accelerate();
bmw.brake();
bmw.brake();

const PersonProto = {
    calcAge() {
        console.log(2039 - this.birthYear);
    }
}

const steven = Object.create(PersonProto);
steven.name = 'Steven';
steven.birthYear = 2002;
steven.calcAge();
console.log(`steven.constructor`);
console.dir(steven.constructor);
console.dir(steven.__proto__);
console.dir(PersonProto.__proto__);

/****** CODING CHALLENGE #2 ******/

class CarClass {
    constructor(make, speed) {
        this.make = make;
        this.speed = speed;
    }

    get speedUS() {
        return this.speed/1.6;
    }

    set speedUS(speed) {
        this.speed = speed*1.6;
    }

    accelerate() {
        this.speed += 5;
    }

    brake() {
        this.speed -= 5;
    }
}

const ford = new CarClass('ford', 120);
console.log(ford.speedUS);
ford.accelerate();
console.log(ford.speedUS);
ford.brake();
console.log(ford.speedUS);
ford.speedUS = 50;
console.log(ford);
console.dir(CarClass.prototype.constructor);

/*** Inheritance using Constructor Functions ***/

const Student = function(firstName, lastName, course) {
    Person.call(this, firstName, lastName);
    this.course = course;
}

Student.prototype = Object.create(Person.prototype);

Student.prototype.getStudent = function (){
    return new Student();
}

const s = new Student('a', 'b', 'c');
console.log(s.course);

// Student.prototype.constructor = Student;

console.dir(Student);

/***** Coding Challenge #3 *****/

const EV = function(make, speed, battery) {
    Car.call(this, make, speed);
    this.battery = battery;
}

EV.prototype = Object.create(Car.prototype);
EV.prototype.constructor = EV;

EV.prototype.chargeBattery = function(chargeTo) {
    this.battery = chargeTo;
}

EV.prototype.accelerate = function() {
    this.speed += 20;
    this.battery--;
    console.log(`${this.make} going at speed of ${this.speed} km/h, with a charge of ${this.battery}%`);
}

const tesla = new EV('Tesla', 120, 23);
tesla.accelerate();

/***** Coding Challenge #4 *****/

// const speed = 10;

class CarCl {
    constructor(make, speed) {
        this.make = make;
        this.speed = speed;
    }

    accelerate() {
        this.speed += 10;
        console.log(this.speed);
    }

    brake() {
        this.speed -= 5;
        // console.log(this.speed);
    }
}

// const car = new CarCl('tesla', 120);
// car.accelerate();

class EVCl extends CarCl {
    #charge;

    constructor(make, speed, charge) {
        super(make, speed);
        this.#charge = charge;
        console.log(`${this.make} going at speed of ${this.speed} km/h, with a charge of ${this.#charge}%`);
    }

    chargeBattery(chargeTo) {
        this.#charge = chargeTo;
        return this;
    }

    accelerate() {
        this.speed += 20;
        this.#charge--;
        console.log(`${this.make} going at speed of ${this.speed} km/h, with a charge of ${this.#charge}%`);
        return this;
    }

    brake() {
        super.brake();
        console.log(`${this.make} going at speed of ${this.speed} km/h, with a charge of ${this.#charge}%`);
    }

}

const rivian = new EVCl('Rivian', 120, 20);

rivian.accelerate().chargeBattery(50).accelerate().brake();
