import {
  useState,
  useCallback,
  SetStateAction,
  SyntheticEvent,
  useEffect,
} from "react";
import Style from "./index.module.scss";
import TextField from "../../base-components/textfield";
import SimpleReactValidator from "simple-react-validator";
import { TEXTFIELD_TYPE } from "../../shared/enums";
import UtilStyles from "../../shared/styles/utilities.module.scss";
import Button from "../../base-components/button";
import { BUTTON_TYPE } from "../../shared/enums";
import { rules, utils } from "../../shared";

const validator = new SimpleReactValidator({
  validators: {
    "greater-or-equal": rules.greaterThanOrEqual,
    "less-or-equal": rules.lessThanOrEqual,
  },
});

const HomePage = () => {
  const [payRateName, setPayRateName] = useState<string | number>("");
  const [basePayRate, setBasePayRate] = useState<number>(0);
  const [bonusAmount, setBonusAmount] = useState<number>(0);
  const [bonusStartLimit, setBonusStartLimit] = useState<number>(0);
  const [bonusEndLimit, setBonusEndLimit] = useState<number>(0);
  const [calculating, setCalculating] = useState<boolean>(false);
  const [result, setResult] = useState<number | null>(null);
  const [clientsCount, setClientsCount] = useState<number>(0);
  const [bonus, setBonus] = useState<number>(0);

  const handleInput =
    (setter: SetStateAction<any>) => (val: number | string) => {
      setter(val);
    };
  const getBonus = useCallback(
    (noOfClients: number) => {
      if (!bonusAmount || noOfClients < bonusStartLimit) return 0;

      if (noOfClients < bonusEndLimit) {
        return bonusAmount * (noOfClients - bonusStartLimit);
      }
      return bonusAmount * (bonusEndLimit - bonusStartLimit);
    },
    [bonusAmount, bonusStartLimit, bonusEndLimit]
  );
  const calculate = useCallback(
    (e: SyntheticEvent) => {
      e.preventDefault();
      if (validator.allValid()) {
        setCalculating(true);
        setTimeout(() => {
          try {
            const noOfClients = utils.getRandomNumberBetween(0, 100);
            const bonus = getBonus(noOfClients);
            setClientsCount(noOfClients);
            setBonus(bonus);
            setResult(basePayRate * noOfClients + bonus);
            setCalculating(false);
          } catch (err) {
            setCalculating(false);
          }
        }, 2000);
      }
    },
    [basePayRate, bonusAmount, bonusStartLimit, bonusEndLimit]
  );

  useEffect(() => {
    if (result != null) {
      setResult(null);
    }
  }, [bonusAmount, bonusStartLimit, bonusEndLimit, basePayRate, payRateName]);

  return (
    <div className={Style.HomePage}>
      <div>
        <form onSubmit={calculate}>
          <h2>Teacher Pay Calculator</h2>
          <TextField
            label="Pay Rate Name"
            maxWidth={200}
            validator={{
              validator,
              for: "pay rate name",
              rules: "required|min:3",
            }}
            value={payRateName}
            onInput={handleInput(setPayRateName)}
          />
          <TextField
            label="Base Pay Rate per Client"
            maxWidth={200}
            className={UtilStyles["mt-3"]}
            inputType={TEXTFIELD_TYPE.NUMBER}
            validator={{
              validator,
              for: "base pay rate",
              rules: "numeric|required|min:0,num",
            }}
            value={basePayRate}
            onInput={handleInput(setBasePayRate)}
          />
          <div
            className={`${Style["HomePage-bonusContainer"]} ${UtilStyles["mt-3"]}`}
          >
            <span>Pay staff a bonus of</span>
            <TextField
              maxWidth={100}
              inputType={TEXTFIELD_TYPE.NUMBER}
              validator={{
                validator,
                for: "bonus amount",
                rules: "numeric|min:0,num",
              }}
              truncateError
              value={bonusAmount}
              onInput={handleInput(setBonusAmount)}
            />
            <span>per client for each client between</span>
            <TextField
              maxWidth={100}
              inputType={TEXTFIELD_TYPE.NUMBER}
              validator={{
                validator,
                for: "bonus start limit",
                rules: `numeric|min:0,num|less-or-equal:${bonusEndLimit},bonus end limit`,
              }}
              truncateError
              value={bonusStartLimit}
              onInput={handleInput(setBonusStartLimit)}
            />
            <span>and</span>
            <TextField
              maxWidth={100}
              inputType={TEXTFIELD_TYPE.NUMBER}
              validator={{
                validator,
                for: "bonus end limit",
                rules: `numeric|min:0,num|greater-or-equal:${bonusStartLimit},bonus start limit`,
              }}
              truncateError
              value={bonusEndLimit}
              onInput={handleInput(setBonusEndLimit)}
            />
          </div>
          <Button
            className={UtilStyles["mt-3"]}
            loading={calculating}
            buttonType={BUTTON_TYPE.SUBMIT}
          >
            Calculate
          </Button>
        </form>
        {result !== null ? (
          <div
            className={`${Style["HomePage-resultDisplay"]} ${UtilStyles["mt-5"]}`}
          >
            <p>
              Total Number Of Clients: <strong>{clientsCount}</strong>
            </p>

            <p>
              Bonus($): <strong>{bonus}</strong>
            </p>
            <p>
              Total Pay($): <strong>{result}</strong>
            </p>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default HomePage;
