import { FiAlertCircle } from "react-icons/fi";
import useSelectEventsState from "./selectEventsStore";

const AdviceKitChange: React.FC = () => {
  const { adviceReaded, setAdviceReaded } = useSelectEventsState();

  return (
    <>
      <div className="flex gap-1 items-center">
        <span>
          <FiAlertCircle size={22} />
        </span>{" "}
        Para kits pagos, a alteração do kit após essa seleção só poderá ser
        feita por meio de email. Podendo assim não garantir a sua vagas nos
        eventos selecionados.
      </div>
      <div className="w-full ml-5">
        <label htmlFor="MarketingAccept" className="flex gap-2 p-1 text-dark">
          <input
            checked={adviceReaded}
            onChange={(e) => setAdviceReaded(!adviceReaded)}
            type="checkbox"
            id="MarketingAccept"
            name="marketing_accept"
            className="h-5 w-5 rounded-full overflow-hidden checked:bg-cyan-700 shadow-sm"
          />

          <span className="text-white">Marque se leu o aviso</span>
        </label>
      </div>
    </>
  );
};

export default AdviceKitChange;
