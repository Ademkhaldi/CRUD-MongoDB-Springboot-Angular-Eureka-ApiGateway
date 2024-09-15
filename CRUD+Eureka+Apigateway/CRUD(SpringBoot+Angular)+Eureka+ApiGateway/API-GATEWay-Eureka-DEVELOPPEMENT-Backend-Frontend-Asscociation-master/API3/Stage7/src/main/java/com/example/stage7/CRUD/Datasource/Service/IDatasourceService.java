package com.example.stage7.CRUD.Datasource.Service;

import com.example.stage7.CRUD.Datasource.entity.Datasource;

import java.util.List;

public interface IDatasourceService {


    List<Datasource> getAllDatasources();

    Datasource retrieveDatasource(String id);

    Datasource createDatasource(Datasource datasource);

    Datasource updateDatasource(String id, Datasource datasource);


    boolean deleteDatasource(String id);

    boolean deleteAllDatasources();

   //Affectation
    boolean affecterChartADatasource(String idDatasource, String idChart);


}
