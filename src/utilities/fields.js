export const income_fields = [
  "salary",
  "bonuses",
  "taxable interest",
  "rollovers",
  "dividends",
  "capital gains short term",
  "capital gains long term"
];

export const deductions_fields = [
  "401k contributions",
  "Traditional IRA Contributions",
  "HSA Contributions",
  "Student Loan Interest Deduction",
  "Mortgage Interest Deduction",
  "Tuition and Fees"
];

export const results_fields = [
  "Total Income",
  "Total Deductions",
  "Adjusted Gross Income",
  "Adjusted Gross Income no LT Capital Gains",
  "Total Standard + Personal Exemptions",
  "Taxable Income",
  "Taxable Defaulted To Zero",
  "Taxable Income no LT Gains",
  "Untaxable Income",
  "Federal Income Tax",
  "Capital Gains Tax",
  "Total Income Tax",
  "Social Security Tax",
  "Medicare Tax",
  "Total FICA Tax",
  "Total Tax"
];

export const AGIincome = income_fields.filter(c => c);
export const AGIdeductions = deductions_fields.filter(c => c);
