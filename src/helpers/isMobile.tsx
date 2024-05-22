import { useEffect, useState } from "react";

export const MOBILE_SIZE = 767;

interface UseIsMobileProps {
  size?: number;
}

const useIsMobile = ({ size }: UseIsMobileProps): boolean => {
  const mobileSize = size ?? MOBILE_SIZE;
  // Iniciar com um estado padrão que não dependa de `window`
  const [width, setWidth] = useState<number>(0);

  useEffect(() => {
    // Certifique-se de que `window` esteja definido (ou seja, que esteja no cliente)
    if (typeof window !== "undefined") {
      // Define a largura da janela no estado
      const handleWindowSizeChange = () => setWidth(window.innerWidth);

      // Adiciona o ouvinte de eventos
      window.addEventListener("resize", handleWindowSizeChange);

      // Chama o manipulador imediatamente para que o estado seja atualizado com o tamanho inicial da janela
      handleWindowSizeChange();

      // Remove o ouvinte de eventos na limpeza
      return () => window.removeEventListener("resize", handleWindowSizeChange);
    }
  }, []);

  // Se `width` for 0 (vawlor inicial), assuma que ainda não foi detectado e evite falsos positivos para mobile
  return width > 0 && width <= mobileSize;
};

export default useIsMobile;
