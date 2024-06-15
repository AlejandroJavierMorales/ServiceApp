import { useContext } from "react";
import { GeneralContext } from "../context/GeneralContext";

export default function useGeneralContext() {
    const generalContext = useContext(GeneralContext);
    return generalContext;
};

