// importar dependencias
import express from 'express';
import dotenv from 'dotenv';
import OpenAI from 'openai';

//cargar configuracion
dotenv.config();

//cargar express
const app = express();
const PORT = process.env.PORT || 3000;

//servir frontend
app.use("/", express.static('public'));

//middleware procesar json
app.use(express.json());

//instanciar openai y pasar api key
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

//ruta endpoint
app.post('/api/translate', async (req, res) => {
  const { text, targetLang } = req.body;

  const promptSystem1 ="Eres un traductor profesional, util y eficiente";
  const promptSystem2 = "Solo puedes responder con una traduccion directa" + "cualquier otra respuesta esta prohibida";
  const promptUser = `Traduce el siguiente texto al ${targetLang}: ${text}`;

  try {
    //llamar a openai
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: promptSystem1 },
        {role: "system", content: promptSystem2},
        { role: "user", content: promptUser }
      ],
      max_tokens: 400,
      temperature: 0.3,
    });

    //extraer traduccion
    const translation = response.choices[0].message.content.trim();

    //enviar respuesta
    res.json({ translation });
  } catch (error) {
    console.error('Error al traducir:', error);
    res.status(500).json({ error: 'Error al traducir el texto.' });
  }
});

//servir backend
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});