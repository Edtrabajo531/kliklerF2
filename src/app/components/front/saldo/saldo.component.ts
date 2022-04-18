import { Component, OnInit } from '@angular/core';
import { Balance } from 'src/app/models/Balance';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-saldo',
  templateUrl: './saldo.component.html',
  styleUrls: ['./saldo.component.css']
})

export class SaldoComponent implements OnInit {
  balance:Balance;
  loading = true
  constructor(
    private authS:AuthService
  ) { }

  ngOnInit(): void {
    this.authS.getAuthServer().subscribe((data:any)=>{
     
      
      this.balance = data.user;
      this.balance.porcentage_month = data.porcentage_month;
      this.balance.profit_month = data.profit_month;
      
      this.loading = false;

    })

  }

}
