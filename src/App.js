import React, { Component } from 'react';
import './App.css';
import { PersonaService } from './service/PersonaService';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Panel } from 'primereact/panel';
import { Menubar } from 'primereact/menubar';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';

import 'primereact/resources/themes/nova/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      visible: false,
      persona: {
        id: null,
        documento: null,
        nombre: null,
        apaterno: null,
        amaterno: null,
        sexo: null
      },
      selectedPersona : {

      }
    };
    this.items = [
      {
        label: 'Nuevo',
        icon: 'pi pi-fw pi-plus',
        command: () => { this.showSaveDialog() }
      },
      {
        label: 'Editar',
        icon: 'pi pi-fw pi-pencil',
        command: () => { this.showEditDialog() }
      },
      {
        label: 'Eliminar',
        icon: 'pi pi-fw pi-trash',
        command: () => { this.delete() }
      }
    ];
    this.personaService = new PersonaService();
    this.save = this.save.bind(this);
    this.delete = this.delete.bind(this);
    this.footer = (
      <div>
        <Button label="Guardar" icon="pi pi-check" onClick={this.save} />
      </div>
    );
  }

  componentDidMount() {
    this.personaService.getAll().then(data => this.setState({ personas: data }));
  }

  save() {
    this.personaService.save(this.state.persona).then(data => {
      this.setState({
        visible: false,
        persona: {
          id: null,
          documento: null,
          nombre: null,
          apaterno: null,
          amaterno: null,
          sexo: null
        }
      });
      this.toast.show({ severity: 'success', summary: 'Persona grabada', detail: 'Se grabó el registro correctamente!!!' });
      this.personaService.getAll().then(data => this.setState({ personas: data }));
    });
  }

  delete() {
    if(window.confirm("¿Desea eliminar el registro?")) {
      this.personaService.delete(this.state.selectedPersona.id).then(data => {
        this.toast.show({ severity: 'success', summary: 'Persona eliminada', detail: 'Se eliminó el registro correctamente!!!' });
        this.personaService.getAll().then(data => this.setState({ personas: data }));
      });
    }
  }

  render() {
    return (
      <div style={{ width: '80%', marginTop: '20px', margin: '0 auto' }}>
        <Menubar model={this.items} />
        <br />
        <Panel header="React Control Activos App - Personas">
        <DataTable value={this.state.personas}  paginator={true} rows="5" selectionMode="single" selection={this.state.selectedPersona} onSelectionChange={e => this.setState({selectedPersona: e.value})}>
            <Column field="id" header="ID"></Column>
            <Column field="documento" header="Documento"></Column>
            <Column field="nombre" header="Nombre"></Column>
            <Column field="apaterno" header="Apellido Paterno"></Column>
            <Column field="amaterno" header="Apellido Materno"></Column>
            <Column field="sexo" header="Sexo"></Column>
          </DataTable>
        </Panel>
        <Dialog header="Crear persona" visible={this.state.visible} style={{ width: '400px' }} footer={this.footer} modal={true} onHide={() => this.setState({ visible: false })}>
          <form id="persona-form">
            <span className="p-float-label">
              <InputText value={this.state.persona.documento} style={{ width: '100%' }} id="documento" onChange={(e) => {
                let val = e.target.value;
                this.setState(prevState => {
                  let persona = Object.assign({}, prevState.persona);
                  persona.documento = val;

                  return { persona };
                })
              }
              } />
              <label htmlFor="documento">Documento</label>
            </span>
            <br />
            <span className="p-float-label">
              <InputText value={this.state.persona.nombre} style={{ width: '100%' }} id="nombre" onChange={(e) => {
                let val = e.target.value;
                this.setState(prevState => {
                  let persona = Object.assign({}, prevState.persona);
                  persona.nombre = val;

                  return { persona };
                })
              }
              } />
              <label htmlFor="nombre">Nombre</label>
            </span>
            <br />
            <span className="p-float-label">
              <InputText value={this.state.persona.apaterno} style={{ width: '100%' }} id="apaterno" onChange={(e) => {
                let val = e.target.value;
                this.setState(prevState => {
                  let persona = Object.assign({}, prevState.persona);
                  persona.apaterno = val;

                  return { persona };
                })
              }
              } />
              <label htmlFor="apaterno">Apellido Paterno</label>
            </span>
            <br />
            <span className="p-float-label">
              <InputText value={this.state.persona.amaterno} style={{ width: '100%' }} id="amaterno" onChange={(e) => {
                let val = e.target.value;
                this.setState(prevState => {
                  let persona = Object.assign({}, prevState.persona);
                  persona.amaterno = val;

                  return { persona };
                })
              }
              } />
              <label htmlFor="amaterno">Apellido Materno</label>
            </span>
            <br />
            <span className="p-float-label">
              <InputText value={this.state.persona.sexo} style={{ width: '100%' }} id="sexo" onChange={(e) => {
                let val = e.target.value;
                this.setState(prevState => {
                  let persona = Object.assign({}, prevState.persona);
                  persona.sexo = val;

                  return { persona };
                })
              }
              } />
              <label htmlFor="sexo">Sexo</label>
            </span>
          </form>
        </Dialog>
        <Toast ref={(el) => this.toast = el} />
      </div >
    );
  }

  showSaveDialog() {
    this.setState({
      visible: true,
      persona: {
        id: null,
        documento: null,
        nombre: null,
        apaterno: null,
        amaterno: null,
        sexo: null
      }
    });
    document.getElementById('persona-form').reset();
  }

  showEditDialog() {
    this.setState({
      visible: true,
      persona: {
        id: this.state.selectedPersona.id,
        documento: this.state.selectedPersona.documento,
        nombre: this.state.selectedPersona.nombre,
        apaterno: this.state.selectedPersona.apaterno,
        amaterno: this.state.selectedPersona.amaterno,
        sexo: this.state.selectedPersona.sexo
      }
    });
  }
}
