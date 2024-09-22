import { Component, OnInit, Signal, signal, WritableSignal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FinanceService } from '../finance.service';  // Ensure the path is correct

interface Transaction {
  id: number;
  date: string;
  description: string;
  category: string;
  amount: number;
  type: 'income' | 'expense';
}

@Component({
  selector: 'app-finance-tracker',
  templateUrl: './finance-tracker.component.html',
  styleUrls: ['./finance-tracker.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule]  // Import ReactiveFormsModule here
})
export class FinanceTrackerComponent implements OnInit {
  transactions: WritableSignal<Transaction[]> = signal([]);  // Writable signal
  totalIncome: WritableSignal<number> = signal(0);  // Writable signal
  totalExpenses: WritableSignal<number> = signal(0);  // Writable signal
  remainingBudget: WritableSignal<number> = signal(0);  // Writable signal

  budgetForm: FormGroup;
  editForm: FormGroup | null = null;

  constructor(private financeService: FinanceService, private fb: FormBuilder) {
    this.budgetForm = this.fb.group({
      category: [''],
      amount: [0]
    });

    this.editForm = this.fb.group({
      id: [0],
      date: [''],
      description: [''],
      category: [''],
      amount: [0],
      type: ['income']  // Default to 'income'
    });
  }

  ngOnInit(): void {
    this.loadTransactions();
  }

  loadTransactions(): void {
    this.financeService.getTransactions().subscribe((data: Transaction[]) => {
      this.transactions.set(data);  // Use set() to update the signal's value
      this.calculateTotals();
    });
  }

  calculateTotals(): void {
    let income = 0;
    let expenses = 0;

    this.transactions().forEach(transaction => {
      if (transaction.type === 'income') {
        income += transaction.amount;
      } else {
        expenses += transaction.amount;
      }
    });

    this.totalIncome.set(income);  // Use set() to update the signal's value
    this.totalExpenses.set(expenses);  // Use set() to update the signal's value
    this.remainingBudget.set(income - expenses);  // Use set() to update the signal's value
  }

  addTransaction(): void {
    // Implement logic to open a modal or form for adding a transaction
  }

  editTransaction(transaction: Transaction): void {
    if (this.editForm) {
      this.editForm.patchValue(transaction);
    }
  }

  saveTransaction(): void {
    if (this.editForm) {
      const updatedTransaction = this.editForm.value as Transaction;
      this.financeService.updateTransaction(updatedTransaction).subscribe(() => {
        this.loadTransactions();
        this.editForm?.reset();
      });
    }
  }

  deleteTransaction(id: number): void {
    this.financeService.deleteTransaction(id).subscribe(() => {
      this.loadTransactions();
    });
  }

  updateBudget(): void {
    const category = this.budgetForm.value.category;
    const amount = this.budgetForm.value.amount;
    // Logic to update the budget for the specified category
  }
}
