import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { City } from './city.model';

@Component({
  selector: 'app-cities',
  templateUrl: './cities.component.html',
  styleUrls: ['./cities.component.css']
})
export class CitiesComponent implements OnInit {

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) { }

  @ViewChild(MatPaginator) paginator: MatPaginator;

  public cities: MatTableDataSource<City>;
  public displayedColumns: string[] = ['id', 'name', 'lat', 'lon'];

  ngOnInit() {
    this.http.get<City[]>(this.baseUrl + "api/cities").subscribe(result => { this.cities = new MatTableDataSource<City>(result);
      this.cities.paginator = this.paginator;
    }, error => console.error(error));
  }

}
