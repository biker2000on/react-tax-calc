import React, { useState, useEffect } from "react";
import Inputs from "./components/Inputs";
import FilingStatus from "./components/FilingStatus";
import Results from "./components/Results";
import { hot } from "react-hot-loader";
import axios from "axios";
import { initializeFields } from "./utilities/initializeFields";
import { Grid, Step, Icon, Segment, Button } from "semantic-ui-react";

const incomeinputs = [
  "salary",
  "bonuses",
  "taxable interest",
  "rollovers",
  "dividends",
  "capital gains short term",
  "capital gains long term"
];

const deductioninputs = [
  "401k contributions",
  "Traditional IRA Contributions",
  "HSA Contributions",
  "Student Loan Interest Deduction",
  "Mortgage Interest Deduction",
  "Tuition and Fees"
];

const App = function() {
  const [activeStep, setActiveStep] = useState(0);
  const [status, setStatus] = useState(0);
  const [year, setYear] = useState(new Date().getFullYear());
  const [federalBrackets, setFederalBrackets] = useState({});
  const [pes, setPEs] = useState(1);
  const [income, setIncome] = useState(initializeFields(incomeinputs));
  const [deductions, setDeductions] = useState(
    initializeFields(deductioninputs)
  );

  const steps = ["Filing Status", "Income", "Deductions", "Results"];

  function getStepContent(index) {
    switch (index) {
      case 0:
        return filingStatus;
      case 1:
        return incomeComp;
      case 2:
        return deductionComp;
      case 3:
        return resultsComp;
      default:
        return <h2>All Done!</h2>;
    }
  }

  useEffect(
    function() {
      (async () => {
        // retrieve data from taxee.io
        try {
          const taxRates = await axios.get(
            "https://taxee.io/api/v2/federal/" + year,
            {
              headers: {
                Authorization: "Bearer " + process.env.REACT_APP_TAXEE_API_KEY
              }
            }
          );
          setFederalBrackets(f => {
            return {
              ...federalBrackets,
              [year]: taxRates.data
            };
          });
          console.log("Tax Rates", year, taxRates.data);
        } catch (error) {
          console.log(
            "Without the tax rates returned, the results will fail calculation",
            error
          );
        }
        return;
      })();
    },
    [year]
  );

  const handleStatusChange = (event, { value }) => {
    setStatus(value);
  };

  const handleYearChange = (event, { value }) => {
    setYear(value);
  };

  const handlePEChange = (event, { value }) => {
    setPEs(value);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };
  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleInputChange = type => name => event => {
    if (type === "income") {
      setIncome({
        ...income,
        [name]: parseInt(event.target.value ? event.target.value : 0)
      });
    }
    if (type === "deductions") {
      setDeductions({
        ...deductions,
        [name]: parseInt(event.target.value)
      });
    }
  };

  const filingStatus = (
    <FilingStatus
      year={year}
      handleYearChange={handleYearChange}
      status={status}
      handleStatusChange={handleStatusChange}
      pes={pes}
      handlePEChange={handlePEChange}
    ></FilingStatus>
  );

  const incomeComp = (
    <Inputs
      items={income}
      handleChange={handleInputChange("income")}
      title="Income"
    ></Inputs>
  );

  const deductionComp = (
    <Inputs
      items={deductions}
      handleChange={handleInputChange("deductions")}
      title="Deductions"
    ></Inputs>
  );

  const resultsComp = (
    <Results
      income={income}
      deductions={deductions}
      brackets={federalBrackets[year]}
      status={status}
      pes={pes}
      year={year}
    ></Results>
  );

  return (
    <>
      <Step.Group attached="top">
        {steps.map((item, i) => (
          <Step key={item} active={i == activeStep}>
            <Icon name="payment"></Icon>
            <Step.Content>
              <Step.Title>{item}</Step.Title>
              <Step.Description>Hello from description</Step.Description>
            </Step.Content>
          </Step>
        ))}
      </Step.Group>
      <Grid className="segment ui attached" centered>
        {getStepContent(activeStep)}
      </Grid>
      <Grid className="segment attached centered">
        <Button.Group>
          <Button disabled={activeStep === 0} onClick={handleBack}>
            Back
          </Button>
          <Button.Or />
          <Button
            positive
            onClick={handleNext}
            disabled={activeStep >= steps.length}
          >
            {activeStep >= steps.length - 1 ? "Finish" : "Next"}
          </Button>
        </Button.Group>
      </Grid>
    </>
  );
};

export default process.env.NODE_ENV === "development" ? hot(module)(App) : App;
