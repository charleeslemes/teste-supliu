import { useEffect, useState } from 'react';
import './add.css';
import api from '../../services/api';
import {FaPlus, FaTrash} from 'react-icons/fa';
import { Link } from "react-router-dom";




export default function CriarAlbum(){
    const [albuns, setALbuns] = useState([]);
    const [newAlbum, setNewAlbum] = useState('');
    const [newAlbumAno, setNewAlbumAno] = useState('');
    const  [newId, setNewId] = useState();
    const [numberFaixa, setNumberfaixa] = useState('');
    const [nameFaixa, setNamefaixa] = useState('');
    const [faixaDuracao, setFaixaDuracao] = useState('');
    const [newBusca, setNewBusca] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(()=>{

        async function loadAlbuns(){
  
            const response = await api.get('album');
            setALbuns(response.data.data);
            setLoading(false);
        
        }
  
        loadAlbuns();
  
      }, [albuns])
 

    /* lendo inputs */

    function handleinputChangeAlbum(el){
        setNewAlbum(el.target.value);
    }

    function handleinputChangeAno(el){
        setNewAlbumAno(el.target.value);
    }

    function handleinputChangeNumberFaixa(e){
      setNumberfaixa(e.target.value);
    }

    function handleinputChangeNameFaixa(e){
      setNamefaixa(e.target.value);
    }

    function handleinputChangeFaixaDuracao(e){
      setFaixaDuracao(e.target.value);
    }

    function handleinputChangeBusca(e){
      setNewBusca(e.target.value);
    }

    /* abiri modais de cadastro */

    function abrirmodalAlbum(){
      let modal = document.querySelector('.modal_addalbum');
      modal.style.display="flex";
  
    }

    function abrirmodal(id){
        let modal = document.querySelector('.modal_addfaixa');
        modal.style.display="flex";
        setNewId(id);
    
      }
  

    function fecharModal(){
      let modal1 = document.querySelector('.modal_addfaixa');
      let modal2 = document.querySelector('.modal_addalbum');
      modal1.style.display="none";
      modal2.style.display="none";

      window.location.reload();
    
    }

    /* função de add novo album */


    function handleSumit(e){
        e.preventDefault();
        
            const hasAlbuns = albuns.some((albuns) => 
            albuns.name === newAlbum
            );

            if(hasAlbuns){
                alert("Esse album já existe");

                setNewAlbum('');
                setNewAlbumAno('');
                return;
            }
        

        api.post('album',{
            name: newAlbum,
            year: newAlbumAno
        })
        

        setNewAlbum('');
        setNewAlbumAno('');
       

    }

    /* funcção de add nova faixa */

    function addNewFaixa(e){
      e.preventDefault();

      

      api.post('track',{
        album_id: newId,
        number: numberFaixa,
        title: nameFaixa,
        duration: faixaDuracao
      })


      setNumberfaixa('');
      setNamefaixa('');
      setFaixaDuracao('');
      
      
    }

    /*funções dedeletar alguns e faixas */
    function deletarFaixa(id){
    api.delete(`track/${id}`);
    }

    function deletarAlbuns(id){
      api.delete(`album/${id}`);
    }


    /* filtrando os nomes dos albuns */

      const lowerBusca = newBusca.toLowerCase();
      const albunsFiltros = albuns.filter((filtro)=>{
       return filtro.name.toLowerCase().includes(lowerBusca);
     })

     /* faznedo carregamento de página */
   

     if(loading){
       return(
         <div className="loading" >
           <h1>Carregando...</h1>
         </div>

       )
     }


    return(
        <>


            <section className="content_home">

            <h5>Digite uma palavra chave</h5>

            <div className="content_form">
            <form>
                <input type="search" placeholder="Digite aqui..." value={newBusca} onChange={handleinputChangeBusca}/>
                <input type="submit" name="acao" value="Procurar"/>
            </form>
            </div>

            <Link className="add_deletar" to="/">Voltar para a Home</Link>

            <div className="modal_addfaixa">
            <button onClick={fecharModal}>X</button>
            <h3>Adicione sua faixa favorita</h3>
                <form className="form_faixa" onSubmit={(e)=>{addNewFaixa(e)}}>
                <input type="number" placeholder="Digite o número da faixa..." value={numberFaixa} onChange={handleinputChangeNumberFaixa}/>
                <input type="text" placeholder="Digite o nome da faixa..." value={nameFaixa} onChange={handleinputChangeNameFaixa}/>
                <input type="number" placeholder="Digite a duração da faixa em segundos, Exemplo:306..." value={faixaDuracao} onChange={handleinputChangeFaixaDuracao}/>
                <input type="submit" name="acao" value="Adicionar"/>
                </form>
            </div>

                    {/* modal album */}

            <div className="modal_addalbum">
            <button onClick={fecharModal}>X</button>
            <h3>Adicione seu álbum favorito</h3>
                <form onSubmit={handleSumit}>
                    <h3>Adicione aqui seu álbum favorito</h3>

                    <input type="text" name='album' placeholder='Escreva seu álbum aqui...' value={newAlbum} onChange={handleinputChangeAlbum}/>
                    <input type="number" name='ano' placeholder="Escreva o ano do álbum..." value={newAlbumAno} onChange={handleinputChangeAno}/>

                    <input type="submit" name="acao" value="Adicionar" />
                </form>
            </div>

            
            <button className="btnAlbuns" onClick={()=> abrirmodalAlbum()}><FaPlus/> Adionar álbum</button>
            {
            albunsFiltros.map((el)=>{

            return(
            <div className="musicas" key={el.id}>
            
                <div className="albuns">
                <h4 onClick={()=> {deletarAlbuns(el.id)}}><FaTrash/></h4>
                <h5>Álbuns: {el.name}, {el.year}</h5>
               

                </div>{/*albuns */}

                <div className="faixas_single">
                    <div className="number_faixa">
                    <h5>N°</h5>
                    <h5>Faixa</h5>
                    <button className="add_faixa" onClick={()=> abrirmodal(el.id)}><FaPlus/></button>
                    
                    </div>{/*number_faixa */}

                    <div className="duracao">
                        <h5>Duração</h5>
                    </div>{/*duracao */}
                </div>{/*faixas_single */}

                {
                el.tracks.map((ele)=>{
                    return(
                
                <div className="faixas" key={ele.id}>
                <div className="faixas_single">
                    <div className="number_faixa">
                    <h4 onClick={()=> {deletarFaixa(ele.id)}}><FaTrash/></h4>
                    <h5>{ele.number}</h5>
                    <h5>{ele.title}</h5>
                    </div>{/*number_faixa */}

                    <div className="duracao">
                        <h5>{`${ele.duration} Seg.`}</h5>
                    
                    </div>{/*duracao */}
                
                </div>{/*faixa_single */}

                </div>

                )

                })

            }

            </div>
            )
            
            })
            
            }

            </section>
        
    </>

    )
}