class Person {
	constructor(name) {
		this.name = name;
	}
}

class Student extends Person {
	constructor(name, roll, Class) {
		super(name);
		this.Class = Class;
		this.roll = roll;
	}
	getDetails() {
		return [this.name, this.roll, this.Class];
	}
}

class Teacher extends Person {
	constructor(name, teacherId, subject) {
		super(name);
		this.teacherId = teacherId;
		this.subject = subject;
	}
	getDetails() {
		return [this.name, this.teacherId, this.subject];
	}
}

let Student1 = new Student("a", "b", "c");
let Teacher1 = new Teacher("d", "e", "f");

console.log(Student1.getDetails());
console.log(Teacher1.getDetails());
