import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterOutlet } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { HttpClient } from "@angular/common/http";
import { HttpClientModule } from "@angular/common/http";
import { Student } from "./student";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    FormsModule,
    HttpClientModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: "app.component.html",
  styleUrl: "./app.component.css",
})
export class AppComponent {
  title = "PatRec";
  public formData: Student = {
    name: "",
    age: "",
    gothra: "",
    father: "",
    joinDate: "",
    samhita: "",
    brahmana: "",
    aranyaka: "",
    sanskrit: "",
    grade: "",
    behaviour: "",
    id: "",
  };

  public request: Student = {
    name: "",
    age: "",
    gothra: "",
    father: "",
    joinDate: "",
    samhita: "",
    brahmana: "",
    aranyaka: "",
    sanskrit: "",
    grade: "",
    behaviour: "",
    id: "",
  };

  public request2: any = [];

  constructor(private http: HttpClient) {}

  addToDataBase() {
    if (this.formData.id) {
      console.log(this.formData);
      this.http
        .post<any>("http://127.0.0.1:5000/submit_form", this.formData)
        .subscribe((response: string) => {
          console.log(response);
          location.reload();
        });
    }
  }

  getInfo() {
    this.http
      .post<any>("http://127.0.0.1:5000/give_info", this.request)
      .subscribe((response: string[]) => {
        this.request = {
          name: "",
          age: "",
          gothra: "",
          father: "",
          joinDate: "",
          samhita: "",
          brahmana: "",
          aranyaka: "",
          sanskrit: "",
          grade: "",
          behaviour: "",
          id: "",
        };
        if (response[0]) {
          this.request.name = response[0];
        }
        if (response[1]) {
          this.request.age = response[1];
        }
        if (response[2]) {
          this.request.gothra = response[2];
        }
        if (response[3]) {
          this.request.father = response[3];
        }
        if (response[4]) {
          this.request.joinDate = response[4];
        }
        if (response[5]) {
          this.request.samhita = response[5];
        }
        if (response[6]) {
          this.request.brahmana = response[6];
        }
        if (response[7]) {
          this.request.aranyaka = response[7];
        }
        if (response[8]) {
          this.request.sanskrit = response[8];
        }
        if (response[9]) {
          this.request.grade = response[9];
        }
        if (response[10]) {
          this.request.behaviour = response[10];
        }
        if (response[11]) {
          this.request.id = response[11];
        }
      });
  }

  saveEdits() {
    this.http
      .post<any>("http://127.0.0.1:5000/update_info", this.request)
      .subscribe((response: string[]) => {
        console.log(response);
        location.reload();
      });
  }

  delete() {
    this.http
      .post<any>("http://127.0.0.1:5000/del", this.request)
      .subscribe((response: string[]) => {
        console.log(response);
        location.reload();
      });
  }

  ngOnInit() {
    this.http
      .get<any>("http://127.0.0.1:5000/get")
      .subscribe((response: string[]) => {
        console.log(response);
        this.request2 = [];
        for (var i = 0; i < response.length; i += 2) {
          this.request2.push({ name: response[i], id: response[i + 1] });
        }

        let compare = (a: any, b: any) => {
          if (parseInt(a.id) < parseInt(b.id)) {
            return -1;
          }
          if (parseInt(a.id) > parseInt(b.id)) {
            return 1;
          }
          return 0;
        };
        this.request2.sort(compare);
        console.log(this.request2);
      });
  }
}
