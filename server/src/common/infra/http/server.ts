import "dotenv/config";
import { app } from "./app.js";

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta: ${PORT}`);
    console.log("Acesse a documentação da API em: http://localhost:" + PORT + "/api-docs");
});