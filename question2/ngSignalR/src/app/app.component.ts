import { Component } from '@angular/core';
import * as signalR from "@microsoft/signalr"
import { MatButtonModule } from '@angular/material/button';


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    standalone: true,
    imports: [MatButtonModule]
})
export class AppComponent {
  title = 'Pizza Hub';

  private hubConnection?: signalR.HubConnection;
  isConnected: boolean = false;

  selectedChoice: number = -1;
  nbUsers: number = 0;

  pizzaPrice: number = 0;
  money: number = 0;
  nbPizzas: number = 0;

  constructor(){
    this.connect();
  }

  connect() {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('http://localhost:5282/hubs/pizza')
      .build();

    // TODO: Mettre isConnected à true seulement une fois que la connection au Hub est faite
    this.hubConnection!.on('UpdateNbUsers', (data) => {
        console.log('UpdateNbUsers : ' + data);
        this.nbUsers = data
    });
    this.hubConnection!.on('UpdateMoney', (data) => {
        // data a le même type que ce qui a été envoyé par le serveur
        console.log('UpdateMoney : ' + data);
        this.money = data
    });
    this.hubConnection!.on('UpdateNbPizzasAndMoney', (nbPizzas: number, money: number) => {
        // data a le même type que ce qui a été envoyé par le serveur
        console.log('UpdateNbPizzasAndMoney : ' + nbPizzas + " money: " + money);
        this.nbPizzas = nbPizzas
        this.money = money
    });
    this.hubConnection!.on('UpdatePizzaPrice', (data) => {
        // data a le même type que ce qui a été envoyé par le serveur
        console.log('UpdatePizzaPrice : ' + data);
        this.pizzaPrice = data
    });
    this.hubConnection
        .start()
        .then(() => {
            console.log('La connexion est active!');
            this.isConnected = true;
          })
        .catch(err => console.log('Error while starting connection: ' + err));
  }

  selectChoice(selectedChoice:number) {
    this.selectedChoice = selectedChoice;
    this.hubConnection!.invoke('SelectChoice', this.selectedChoice);
  }

  unselectChoice() {
    this.hubConnection!.invoke('UnselectChoice', this.selectedChoice);
    this.selectedChoice = -1;
  }

  addMoney() {
    this.hubConnection!.invoke('AddMoney', this.selectedChoice);
  }

  buyPizza() {
     this.hubConnection!.invoke('BuyPizza', this.selectedChoice);
  }
}
