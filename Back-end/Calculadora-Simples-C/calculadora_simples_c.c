#include <stdio.h>

int main() {
    int operacao;
    float num1, num2, resultado;

    do {
        printf("\n=== Calculadora Simples ===\n");
        printf("Escolha uma operação:\n");
        printf("1. Soma\n");
        printf("2. Subtração\n");
        printf("3. Multiplicação\n");
        printf("4. Divisão\n");
        printf("5. Sair\n");
        printf("Digite sua escolha: ");
        scanf("%d", &operacao);

        if (operacao == 5) {
            printf("Encerrando a calculadora...\n");
            break;
        }

        printf("Digite o primeiro número: ");
        scanf("%f", &num1);
        printf("Digite o segundo número: ");
        scanf("%f", &num2);

        switch (operacao) {
            case 1:
                resultado = num1 + num2;
                printf("Resultado: %.2f\n", resultado);
                break;
            case 2:
                resultado = num1 - num2;
                printf("Resultado: %.2f\n", resultado);
                break;
            case 3:
                resultado = num1 * num2;
                printf("Resultado: %.2f\n", resultado);
                break;
            case 4:
                if (num2 != 0) {
                    resultado = num1 / num2;
                    printf("Resultado: %.2f\n", resultado);
                } else {
                    printf("Erro: Divisão por zero não é permitida.\n");
                }
                break;
            default:
                printf("Opção inválida. Tente novamente.\n");
                break;
        }
    } while (1);

    return 0;
}
