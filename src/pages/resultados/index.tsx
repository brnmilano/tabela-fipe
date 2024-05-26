import { useRequests } from "@/hooks/useRequests";
import { Button } from "@/components/Button";
import { fipeTableRoute } from "@/constants/path";
import styles from "./styles.module.scss";
import FadeInFromTopWhenVisible from "@/components/Animations/FadeInFromTopWhenVisible";
import Link from "next/link";

export default function Results() {
  const { results } = useRequests();

  return (
    <FadeInFromTopWhenVisible>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.infosDetails}>
            <h1>
              Tabela fipe Preço: {results?.Marca ?? "-"}{" "}
              {results?.Modelo ?? "-"} {results?.AnoModelo ?? "-"}
            </h1>
          </div>

          <div className={styles.priceDetails}>
            <p>{results?.Valor ? results?.Valor : "R$0,00"}</p>
          </div>

          <div className={styles.priceText}>
            <p>Este é o preço de compra do veículo</p>
          </div>

          <div className={styles.backButton}>
            <Link href={fipeTableRoute}>
              <Button variant="text">Nova consulta</Button>
            </Link>
          </div>
        </div>
      </div>
    </FadeInFromTopWhenVisible>
  );
}
