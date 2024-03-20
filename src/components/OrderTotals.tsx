import { useMemo, useState } from "react";
import { OrderItem } from "../types";
import { formatCurrency } from "../helpers";
import ModalAlert from "./ModalAlert";

type OrderTotalProps = {
  order: OrderItem[];
  tip: number;
  placeOrder: () => void;
};

export default function OrderTotals({
  order,
  tip,
  placeOrder,
}: OrderTotalProps) {
  const subtotalAmount = useMemo(
    () => order.reduce((total, item) => total + item.quantity * item.price, 0),
    [order]
  );

  const tipAmount = useMemo(() => subtotalAmount * tip, [tip, order]);
  const totalAmount = useMemo(() => subtotalAmount + tipAmount, [tip, order]);
  const [showAlert, setShowAlert] = useState(false);

  const handlerOrder = () => {
    setShowAlert(true);
    //placeOrder();
  };

  return (
    <>
      <div className=" space-y-3">
        <h2 className="font-black text-2xl">Totales y Propina:</h2>

        <p>
          Subtotal a pagar: {""}{" "}
          <span className="font-bold">{formatCurrency(subtotalAmount)}</span>{" "}
        </p>

        <p>
          Propina: {""}{" "}
          <span className="font-bold">{formatCurrency(tipAmount)}</span>{" "}
        </p>

        <p>
          Total a Pagar: {""}{" "}
          <span className="font-bold">{formatCurrency(totalAmount)}</span>{" "}
        </p>
      </div>

      <button
        className={`w-full bg-black p-3 uppercase text-white font-bold mt-10 ${
          totalAmount === 0 ? "opacity-10" : ""
        }`}
        disabled={totalAmount === 0}
        // onClick={placeOrder}
        onClick={handlerOrder}
      >
        Guardar orden
      </button>

      {showAlert && ( // Verifica si showAlert es true para mostrar el modal
        <ModalAlert
          isOpen={showAlert} // Pasa showAlert como prop isOpen al componente ModalAlert
          onClose={() => setShowAlert(false)} // Pasa la función para cerrar la alerta modal
          title="¡Confirmación!"
          message="¿Está seguro de que desea guardar la orden?"
          onAccept={placeOrder} // Pasa la función placeOrder como prop onAccept al componente ModalAlert
        />
      )}
    </>
  );
}
