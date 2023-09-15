import {
  Component,
  Output,
  EventEmitter,
  Input,
  ViewEncapsulation,
  OnInit,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NavService } from 'src/app/services/nav.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class HeaderComponent implements OnInit {
  @Input() showToggle = true;
  @Input() toggleChecked = false;
  @Output() toggleMobileNav = new EventEmitter<void>();
  @Output() toggleMobileFilterNav = new EventEmitter<void>();
  @Output() toggleCollapsed = new EventEmitter<void>();

  showFiller = false;
  name:string;
  photo:string;
  constructor(public dialog: MatDialog, private service:NavService) {}
   
  ngOnInit(): void {
    this.service.infoClub(localStorage.getItem("token")).subscribe(data=>{
      this.name=data.name;
      this.photo=data.photo;
    })
  }
}
