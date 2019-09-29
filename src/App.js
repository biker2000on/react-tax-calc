import React, { useState, useEffect } from "react";
// import './App.scss';
import {
  Step,
  Stepper,
  StepLabel,
  Container,
  Button,
  Grid,
  Typography
} from "@material-ui/core";
import Inputs from "./components/Inputs";
import FilingStatus from "./components/FilingStatus";
import Results from "./components/Results";
import { hot } from "react-hot-loader";
import axios from "axios";
import { initializeFields } from './utilities/initializeFields'

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
        return (
          <FilingStatus
            year={year}
            handleYearChange={handleYearChange}
            status={status}
            handleStatusChange={handleStatusChange}
            pes={pes}
            handlePEChange={handlePEChange}
          ></FilingStatus>
        );
      case 1:
        return (
          <Inputs
            items={income}
            handleChange={handleInputChange("income")}
            title="Income"
          ></Inputs>
        );
      case 2:
        return (
          <Inputs
            items={deductions}
            handleChange={handleInputChange("deductions")}
            title="Deductions"
          ></Inputs>
        );
      case 3:
        return (
          <Results
            income={income}
            deductions={deductions}
            brackets={federalBrackets[year]}
            status={status}
            pes={pes}
            year={year}
          ></Results>
        );
      default:
        return <Typography variant="h4">All Done!</Typography>;
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
          console.log('Without the tax rates returned, the results will fail calculation', error);
        }
        return;
      })();
    },
    [year]
  );

  const handleStatusChange = event => {
    setStatus(event.target.value);
  };

  const handleYearChange = event => {
    setYear(event.target.value);
  };

  const handlePEChange = event => {
    setPEs(event.target.value);
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
        [name]: parseInt(event.target.value)
      });
    }
    if (type === "deductions") {
      setDeductions({
        ...deductions,
        [name]: parseInt(event.target.value)
      });
    }
  };

  return (
    <Container maxWidth="md">
      <Grid container spacing={3} justify="center">
        <Grid item xs={12}>
          <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map(label => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </Grid>
        <Grid item xs={12}>
          {getStepContent(activeStep)}
        </Grid>
        <Grid item>
          <Button disabled={activeStep === 0} onClick={handleBack}>
            Back
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleNext}
            disabled={activeStep === steps.length}
          >
            {activeStep === steps.length - 1 ? "Finish" : "Next"}
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default process.env.NODE_ENV === "development" ? hot(module)(App) : App;
