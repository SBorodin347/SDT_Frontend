import {Pipe, PipeTransform} from "@angular/core";
import {Course} from "../models/course.model";

@Pipe({
  name: 'booksFilterByTitle'
})
export class BooksFilterPipe implements PipeTransform{
  transform(subjects: Course[], search: string): Course[] {
    if (!search.trim()){
      return subjects;
    }
    return subjects.filter(subject=>{
      return subject.name.toLocaleLowerCase().indexOf(search.toLocaleLowerCase()) !== -1 ;
    })
  }
}
