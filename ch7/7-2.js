export class Person {
  #name;
  #courses;
  constructor(name) {
    this.#name = name;
    this.#courses = [];
  }

  get name() {
    return this.#name;
  }

  get courses() {
    return [...this.#courses];
  }

  addCourse(course) {
    this.#courses.push(course);
  }

  removeCourse(course, runIfsent) {
    const index = this.#courses.indexOf(course);
    if (index === -1) {
      runIfsent();
      return;
    }
    this.#courses.splice(index, 1);
  }

}

export class Course {
  #name;
  #isAdvanced;
  constructor(name, isAdvanced) {
    this.#name = name;
    this.#isAdvanced = isAdvanced;
  }

  get name() {
    return this.#name;
  }

  get isAdvanced() {
    return this.#isAdvanced;
  }
}

const david = new Person('david');
const course = new Course('리팩토링', true);
david.addCourse(course);
console.log('현재 강의수 > ', david.courses.length);
david.removeCourse(course, ()=>{
  console.log('해당 수업이 없습니다.');
});
console.log('현재 강의수 > ', david.courses.length);
david.removeCourse(course, ()=>{
  console.log('해당 수업이 없습니다.');
});