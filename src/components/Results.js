import React, { useEffect, useState } from "react";
import { Grid } from "semantic-ui-react";
import totalizer from "../utilities/totalizer";
import { medicare_rates, social_security_rates } from "../utilities/taxes";
import { initializeFields } from "../utilities/initializeFields";
import { results_fields } from "../utilities/fields";
import { groupGridFields } from "../utilities/groupFields";


const bracketMap = {
  0: "single",
  1: "married",
  2: "married_separately",
  3: "head_of_household",
  4: "married"
};

const calcSSTax = (income, rates) => {
  if (income < rates.maximum) {
    return parseInt((income * rates.employee_rate) / 100);
  }
  return parseInt(rates.maximum * rates.employee_rate / 100);
};

const calcMedicareTax = (income, rates) => {
  let tax = income * rates.employee_rate / 100
  if (income > rates.additional_bracket) {
    tax += (income - rates.additional_bracket) * rates.additional_rate / 100
  }
  return parseInt(tax)
}

function Results({ income, deductions, brackets, status, pes, year }) {
  const [results, setResults] = useState({});

  useEffect(() => {
    try {
      const defaultToZero = value => (value > 0 ? value : 0);
      const usedBracket = brackets[bracketMap[status]];
      console.log(usedBracket, bracketMap, status, brackets);
      const totalIncome = totalizer(income);
      const totalDeductions = totalizer(deductions);
      const AGI = totalIncome - totalDeductions; // includes LT gains
      const AGInoLTGains = AGI - income["capital gains long term"];
      const taxExemptionsDeductions =
        usedBracket.deductions[0].deduction_amount -
        usedBracket.exemptions[0].exemption_amount * pes;
      const taxable = AGI - taxExemptionsDeductions;
      const taxableNoLTGains = defaultToZero(
        AGInoLTGains - taxExemptionsDeductions
      );
      const untaxable = totalIncome - defaultToZero(taxable);
      const bracketIndex = usedBracket.income_tax_brackets.reduce((a, c, i) => {
        if (defaultToZero(taxableNoLTGains) >= c.bracket) {
          a["income"] = i;
        }
        if (defaultToZero(taxable) >= c.bracket) {
          a["gains"] = i;
        }
        return a;
      }, {});
      const bracket = usedBracket.income_tax_brackets[bracketIndex["income"]];
      const federalIncomeTax =
        bracket.amount +
        ((taxableNoLTGains - bracket.bracket) * bracket.marginal_rate) / 100;
  
      function getCapitalGainsTax(brackets, gains, taxable) {
        let possibleBrackets = usedBracket.income_tax_brackets.slice(
          brackets["gains"]
        );
        let i = 0;
        let tax = 0;
        let gainsInBracket = 0;
        while (gains > 0) {
          if (i < possibleBrackets.length - 2) {
            gainsInBracket = possibleBrackets[i + 1].bracket - (taxable - gains);
          } else {
            gainsInBracket = gains;
          }
          tax +=
            (gainsInBracket * possibleBrackets[i].marginal_capital_gain_rate) /
            100;
          gains -= gainsInBracket;
          i++;
        }
        return tax;
      }
      const capitalGainTax = getCapitalGainsTax(
        bracketIndex,
        AGI - AGInoLTGains,
        defaultToZero(taxable)
      );
      const ss = calcSSTax(income.salary + income.bonuses, social_security_rates[year])
      const medicare = calcMedicareTax(income.salary + income.bonuses, medicare_rates[year])
      const totalTax = ss + medicare + federalIncomeTax + capitalGainTax;
  
      setResults({
        "Total Income": totalIncome,
        "Total Deductions": totalDeductions,
        "Adjusted Gross Income": AGI,
        "Adjusted Gross Income no LT Capital Gains": AGInoLTGains,
        "Total Standard + Personal Exemptions": taxExemptionsDeductions,
        "Taxable Income": taxable,
        "Taxable Defaulted To Zero": defaultToZero(taxable),
        "Taxable Income no LT Gains": taxableNoLTGains,
        "Untaxable Income": untaxable,
        "Federal Income Tax": federalIncomeTax,
        "Capital Gains Tax": capitalGainTax,
        "Total Income Tax": federalIncomeTax + capitalGainTax,
        "Social Security Tax": ss,
        "Medicare Tax": medicare,
        "Total FICA Tax": ss + medicare,
        "Total Tax": totalTax
      });
    } catch (error) {
      setResults(initializeFields(results_fields))
    }
  }, [income, deductions, brackets, pes, status, year]);

  return (
    <Grid container spacing={5} justify="center" alignItems="center" stackable>
      {groupGridFields(results, 3)}
    </Grid>
  );
}

export default Results;
