const express = require('express'); 

const server = express(); 
server.use(express.json()); 
const porta = 3333;

/*
POST /projects: A rota deve receber id e title dentro do corpo e cadastrar um novo projeto dentro de um array no seguinte formato: { id: "1", title: 'Novo projeto', tasks: [] }; Certifique-se de enviar tanto o ID quanto o título do projeto no formato string com aspas duplas.


GET /projects: Rota que lista todos projetos e suas tarefas;

PUT /projects/:id: A rota deve alterar apenas o título do projeto com o id presente nos parâmetros da rota;

DELETE /projects/:id: A rota deve deletar o projeto com o id presente nos parâmetros da rota;

POST /projects/:id/tasks: A rota deve receber um campo title e armazenar uma nova tarefa no array de tarefas de um projeto específico escolhido através do id presente nos parâmetros da rota;
*/


function checkProjectInArray( req, res, next ){
   const { index } = req.params;
   const project = projects[index]; 

   if( !project ){
      return res.status(400).json({erro: 'Project does no exists'}); 
   }
   return next();
}

const projects =  [
                     { 
                        id: "1", title: 'Projeto A', tasks: [] 
                     }, 
                     { 
                        id: "2", title: 'Projeto B', tasks: [] 
                     }
                  ];

server.get('/projects', (req, res) => {
   return res.status(200).json(projects);

});
server.get('/project/:index',checkProjectInArray, (req, res) => {
   const { index } = req.params;
   return res.status(200).json(projects[index]);
});

server.put('/project/:index', (req,res) => {
   const { index } = req.params;
   const { title} = req.body;
   const {id, tasks} = projects[index];
   projects[index] = {id,title, tasks };

   return res.status(200).json(projects)
}); 

server.post('/project', (req, res) => {
   const numberProjects = projects.length;
   req.body.id = numberProjects + 1;
   req.body.tasks = ['Nova Tarefa']

   projects.push( req.body ); 
   return res.status(201).json(projects);
});

server.delete('/project/:index', checkProjectInArray, (req, res) => {
   const {index} = req.params;
   projects.splice(index, 1);
   return res.json(projects);

}); 

server.listen(porta, () => console.log(`A funcionar na porta ${porta}`))