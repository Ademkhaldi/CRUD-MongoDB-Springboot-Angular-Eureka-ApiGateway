package com.example.stage7.CRUD.Datasource.Service;

import com.example.stage7.CRUD.Chart.entity.Chart;
import com.example.stage7.CRUD.Chart.repository.ChartRepository;
import com.example.stage7.CRUD.Datasource.entity.Datasource;
import com.example.stage7.CRUD.Datasource.repository.DatasourceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class DatasourceService implements IDatasourceService {

    @Autowired
    private DatasourceRepository datasourceRepository;

    @Autowired
    private ChartRepository chartRepository;

    @Override

    public List<Datasource> getAllDatasources() {
        return datasourceRepository.findAll();
    }
    @Override
    public Datasource retrieveDatasource(String id) {
        return datasourceRepository.findById(id).orElse(null);
    }    @Override


    public Datasource createDatasource(Datasource datasource) {
        datasource.setCreationDate(new Date()); // Utilise la date et l'heure actuelles lors de la création
        datasource.setUpdate_date(datasource.getCreationDate()); // Met à jour la date de création
        return datasourceRepository.save(datasource);
    }
    @Override
    public Datasource updateDatasource(String id, Datasource datasource) {
        Optional<Datasource> existingDatasourceOptional = datasourceRepository.findById(id);
        if (existingDatasourceOptional.isPresent()) {
            Datasource existingDatasource = existingDatasourceOptional.get();
            existingDatasource.setType(datasource.getType());
            existingDatasource.setConnection_port(datasource.getConnection_port());
            existingDatasource.setUrl(datasource.getUrl());
            existingDatasource.setIndex(datasource.getIndex());
            existingDatasource.setUser(datasource.getUser());
            existingDatasource.setPassword(datasource.getPassword());


            // Mise à jour de la date de mise à jour et de l'identifiant du metteur à jour
            existingDatasource.setUpdate_date(new Date());
            existingDatasource.setUpdator_id(datasource.getUpdator_id());

            return datasourceRepository.save(existingDatasource);
        } else {
            return null; // Gérer l'absence de l'élément à mettre à jour comme vous le souhaitez
        }
    }

    @Override

    public boolean deleteDatasource(String id) {
        if (datasourceRepository.existsById(id)) {
            datasourceRepository.deleteById(id);
            return true;
        } else {
            return false; // Gérer l'absence de l'élément à supprimer comme vous le souhaitez
        }
    }

    @Override
    public boolean deleteAllDatasources() {
        long countBeforeDelete = datasourceRepository.count();
        datasourceRepository.deleteAll();
        long countAfterDelete = datasourceRepository.count();
        return countBeforeDelete != countAfterDelete;

    }


    //Affectation

    @Override
    public boolean affecterChartADatasource(String idDatasource, String idChart) {
        Optional<Datasource> optionalDatasource = datasourceRepository.findById(idDatasource);
        Optional<Chart> optionalChart = chartRepository.findById(idChart);

        if (optionalDatasource.isPresent() && optionalChart.isPresent()) {
            Datasource datasource = optionalDatasource.get();
            Chart chart = optionalChart.get();
            datasource.setChart(chart);
            datasourceRepository.save(datasource);
            return true;

        } else {
            // Gérer le cas où le portlet ou le tableau de bord n'est pas trouvé
            // Vous pouvez lancer une exception appropriée ou renvoyer null, selon vos besoins
            //System.out.println("Portlet ou Dashboard non trouvé");
            return false;

        }
    }




}

