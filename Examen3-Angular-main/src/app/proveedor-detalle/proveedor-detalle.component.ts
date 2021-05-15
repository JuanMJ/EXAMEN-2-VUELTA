import { Component, OnInit, Input } from '@angular/core'
import { Proveedor } from '../proveedor';
import { ProveedorService } from '../proveedor.service';

@Component({
  selector: 'app-proveedor-detalle',
  templateUrl: './proveedor-detalle.component.html',
  styleUrls: ['./proveedor-detalle.component.css']
})
export class ProveedorDetalleComponent implements OnInit {

  @Input() proveedor?: Proveedor;
  resultsLength: any;
  proveedores: any;
  selectedProveedor: Proveedor;
  
  constructor(private datosProveedor:ProveedorService) { }

  ngOnInit(): void {
  }
  actualizar(name: string, id:number): void {
    name = name.trim();

    var newProveedor = <Proveedor>{};
    
    newProveedor.id=id;
    newProveedor.name=name;
    newProveedor.type="proveedor";
    newProveedor.saldo=0;
    newProveedor.estado= "nuevo";
    
    if (!name) { return; }
    
    this.datosProveedor
      .getSize()
      .subscribe(id => this.resultsLength = id);

      this.datosProveedor.actualizaProveedor(newProveedor).subscribe(responseList => {
        this.proveedores = responseList[0];
        this.resultsLength = responseList[1];
    });
 
   }
  eliminar(name: string, id:number): void {
    name = name.trim();

    var newProveedor = <Proveedor>{};
    
    newProveedor.id=id;
    newProveedor.name=name;
    
    if (!name) { return; }
    
    this.datosProveedor
      .getSize()
      .subscribe(id => this.resultsLength = id);

      this.datosProveedor.eliminarProveedor(newProveedor).subscribe(responseList => {
        this.proveedores = responseList[0];
        this.resultsLength = responseList[1];
    });
}
}

