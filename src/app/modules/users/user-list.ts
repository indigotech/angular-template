import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { AnimatedComponent } from 'widgets';
import { BaseComponent } from 'app/core';
import { ModalDirective } from 'widgets';
import { NotificationService } from 'app/modules/shared/notification';
import { UserListQuery } from 'app/models/graphql.schema';
import { UserListUseCase, FirebaseUserUseCase } from 'app/domain';
import { User } from 'app/models';

interface QueryParams {
  page?  : number;
  q?     : string;
  sortBy?: string;
  order? : 'ASC' | 'DESC';
}

@AnimatedComponent('fadeIn')
@Component({
  selector: 'user-list',
  template: require('./user-list.pug'),
})
export class UserList extends BaseComponent {

  private searchForm                : FormGroup;
  private searchField               : FormControl;
  private noResults                 : boolean = false;
  private readonly notificationName : string = 'user-list';

  private queryParams: QueryParams = {};

  private users: {id, name, email}[];
  private totalPages: number = 1;

  @ViewChild ('modal') modal: ModalDirective;

  constructor(
    notification  : NotificationService,
    private fb    : FormBuilder,
    private route : ActivatedRoute,
    private router: Router,
    private userListUC: UserListUseCase,
    private firebaseUserUC: FirebaseUserUseCase,
  ) {
    super(notification);

    this.route.queryParams.subscribe(params => {
      this.queryParams.page   = parseInt(params['page'], 0) || 1;
      this.queryParams.q      = params['q']      || null;
      this.queryParams.sortBy = params['sortBy'] || 'name';
      this.queryParams.order  = params['order']  || 'ASC';

      this.userListUC.exec(this.queryParams.page, this.queryParams.sortBy, this.queryParams.order)
      .subscribe( ( data : any ) => {
        this.users = data.nodes;
        this.totalPages = data.totalPages;
      });

      //TODO: Fetch data goes here
      console.warn('Fetch data goes here. Params: ', this.queryParams);
    });
}

  ngOnInit() {
    this.searchField = this.fb.control(this.queryParams.q);
    this.searchForm = this.fb.group({ searchField: this.searchField });
  }

  ngAfterViewInit() {
    this.showSuccessMsg(this.notificationName, '<Notification Mock> Dados carregados com sucesso!');
  }

  resetQueryParams() {
    const query = this.queryParams;
    this.router.navigate(['.'],  { relativeTo: this.route, queryParams: query });
  }

  // Sort by
  onSortBy(field: string) {

    if ( this.queryParams.sortBy === field) {
      this.queryParams.order = (this.queryParams.order === 'ASC') ? 'DESC' : 'ASC';
    } else {
      this.queryParams.sortBy = field;
      this.queryParams.order = 'ASC';
    }

    this.resetQueryParams();
  }

  // Search
  onSearchErased() {
    this.queryParams.q = undefined;
    this.queryParams.page = undefined;
    this.resetQueryParams();
  }

  onSubmit(form: FormGroup): void {
    if (form.valid) {
      this.queryParams.q = this.searchField.value;
      this.queryParams.page = undefined;
      this.resetQueryParams();
    }
  }

  // Pagination
  onPageTap(page: number) {

    this.queryParams.page = page;
    this.resetQueryParams();
  }

  // Modal
  onDeleteTap() {
    this.modal.open();
  }

  private onFirebaseListTap() {
    this.firebaseUserUC.list()
    .subscribe(
      (users: { (id: string): User }) => {
        let userList: {id, name, email}[] = [];
        for (let key in users) {
          userList.push({...users[key], id: key});
        }
        this.users = userList;
      },
      (err) => this.showErrorMsg(this.notificationName, err));
  }
}
