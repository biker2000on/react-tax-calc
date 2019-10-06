import React, { useState, useEffect } from "react";
// import './App.scss';
import {
  createMuiTheme,
  Step,
  Stepper,
  StepLabel,
  Container,
  Button,
  Grid,
  Typography,
  Paper,
  makeStyles,
  Box
} from "@material-ui/core";
import { ChevronLeft, MenuRounded, ChevronRight } from "@material-ui/icons";
import Inputs from "./components/Inputs";
import FilingStatus from "./components/FilingStatus";
import Results from "./components/Results";
import { hot } from "react-hot-loader";
import axios from "axios";
import { initializeFields } from "./utilities/initializeFields";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { income_fields, deductions_fields } from "./utilities/fields";
import { ThemeProvider } from "@material-ui/styles";
import { Root, Header, Nav, Content, Footer, presets } from "mui-layout";
import NavigationContent from './components/NavigationContent'
import { green, purple } from "@material-ui/core/colors";

const theme = createMuiTheme({
  palette: {
    primary: purple,
    secondary: green,
  },
  status: {
    danger: 'orange',
  },
});
const config = presets.createStandardLayout();
const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(3, 3)
  }
}));

const App = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [status, setStatus] = useState(0);
  const [year, setYear] = useState(new Date().getFullYear());
  const [federalBrackets, setFederalBrackets] = useState({});
  const [pes, setPEs] = useState(1);
  const [income, setIncome] = useState(initializeFields(income_fields));
  const [deductions, setDeductions] = useState(
    initializeFields(deductions_fields)
  );

  const classes = useStyles();

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

  const steps = ["Filing Status", "Income", "Deductions", "Results"];
  
  let filingStatus = (
    <FilingStatus
      year={year}
      handleYearChange={handleYearChange}
      status={status}
      handleStatusChange={handleStatusChange}
      pes={pes}
      handlePEChange={handlePEChange}
    ></FilingStatus>
  );
  let incomeComp = (
    <Inputs
      items={income}
      handleChange={handleInputChange("income")}
      title="Income"
    ></Inputs>
  );
  let deductionsComp = (
    <Inputs
      items={deductions}
      handleChange={handleInputChange("deductions")}
      title="Deductions"
    ></Inputs>
  );
  let resultsComp = (
    <Results
      income={income}
      deductions={deductions}
      brackets={federalBrackets[year]}
      status={status}
      pes={pes}
      year={year}
    ></Results>
  );

  function getStepContent(index) {
    switch (index) {
      case 0:
        return filingStatus;
      case 1:
        return incomeComp;
      case 2:
        return deductionsComp;
      case 3:
        return resultsComp;
      default:
        return <Typography variant="h4">All Done!</Typography>;
    }
  }

  return (
    <Router>
      <ThemeProvider theme={theme}>
        <Root config={config}>
          <Header
            renderMenuIcon={open => (open ? <ChevronLeft /> : <MenuRounded />)}
          >
            React Tax Calculator
          </Header>
          <Nav
            renderIcon={collapsed =>
              collapsed ? <ChevronRight /> : <ChevronLeft />
            }
          >
            <NavigationContent></NavigationContent>
          </Nav>
          <Content>
            <Switch>
              <Route path="/dashboard">
                <Container>
                  <Box my={2}>
                    <Grid container spacing={3} justify="center">
                      <Grid item md={4}>
                        <Paper className={classes.paper}>
                          {filingStatus}
                        </Paper>
                      </Grid>
                      <Grid item md={4}>
                        <Paper className={classes.paper}>
                          {incomeComp}
                        </Paper>
                      </Grid>
                      <Grid item md={4}>
                        <Paper className={classes.paper}>
                          {deductionsComp}
                        </Paper>
                      </Grid>
                      <Grid item md={12}>
                        <Paper className={classes.paper}>
                          {resultsComp}
                        </Paper>
                      </Grid>
                    </Grid>
                  </Box>
                </Container>
              </Route>
              <Route path="/">
                <Container maxWidth="md">
                  <Box my={2}>
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
                        <Button
                          disabled={activeStep === 0}
                          onClick={handleBack}
                        >
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
                  </Box>
                </Container>
              </Route>
            </Switch>
          </Content>
        </Root>
      </ThemeProvider>
    </Router>
  );
};

// export default process.env.NODE_ENV === "development" ? hot(module)(App) : App;
export default App;
