import { LoginResponseBody } from '1000-goals-types/src/Responses/loginResponse';
import { Pipe, PipeTransform } from '@angular/core';
import { calculatePoints } from '../utils/calculatePoints';
@Pipe({
    name:'pointsPipe',
    pure:true,
    standalone:true
})
export class PointsPipe implements PipeTransform{
    transform(value:LoginResponseBody|null,userid:string){
      return calculatePoints(value,userid);
    }
}