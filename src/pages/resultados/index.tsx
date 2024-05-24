import { resultsDetailsFooterText, resultsDetailsText } from "@/constants/messages";
import { useReqs } from "@/hooks/useReq";
import { Button } from "@/components/Button";
import { useRouter } from "next/router";
import { fipeTableRoute, resultsRoute } from "@/constants/path";
import styles from "./styles.module.scss";
import FadeInFromTopWhenVisible from "@/components/Animations/FadeInFromTopWhenVisible";

export default function Results() {
  const router = useRouter();

  const { results } = useReqs();

  const handleGoBack = () => {
    router.push(fipeTableRoute);
  };

  return (
    <FadeInFromTopWhenVisible>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.infosDetails}>
            <h1>
              {resultsDetailsText} {results?.Marca ?? "-"}{" "}
              {results?.Modelo ?? "-"} {results?.AnoModelo ?? "-"}
            </h1>
          </div>

          <div className={styles.priceDetails}>
            <p>{results?.Valor ? results?.Valor : "R$0,00"}</p>
          </div>

          <div className={styles.priceText}>
            <p>{resultsDetailsFooterText}</p>
          </div>

          <div className={styles.backButton}>
            <Button onClick={handleGoBack} variant="text">
              Nova consulta
            </Button>
          </div>
        </div>
      </div>
    </FadeInFromTopWhenVisible>
  );
}
