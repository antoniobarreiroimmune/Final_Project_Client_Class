import React from 'react';
import { Table, Thead, Tbody, Tr, Th, Td, Button } from '@chakra-ui/react';

function ProcedureTable({ procedures, onEdit }) {
  return (
    <Table variant="simple" size="sm">
      <Thead>
        <Tr>
          <Th textAlign="center">Nombre</Th>
          <Th textAlign="center">Primer apellido</Th>
          <Th textAlign="center">Segundo apellido</Th>
          <Th textAlign="center">DNI</Th>
          <Th textAlign="center">Ubicación</Th>
          <Th textAlign="center">Observaciones</Th>
          <Th textAlign="center">Violencia de Género</Th>
          <Th textAlign="center">Violencia Doméstica</Th>
          <Th textAlign="center">Órgano Judicial</Th>
          <Th textAlign="center">Informe del Procedimiento</Th>
          <Th textAlign="center">Procedimiento Completado</Th>
          <Th textAlign="center">Creado</Th>
          <Th textAlign="center">Actualizado</Th>
          <Th textAlign="center">Acciones</Th>
        </Tr>
      </Thead>
      <Tbody>
        {procedures.map((procedure, index) => (
          <Tr key={procedure._id} bg={index % 2 === 0 ? 'gray.200' : 'white'}>
            <Td textAlign="center">{procedure.name}</Td>
            <Td textAlign="center">{procedure.firstName}</Td>
            <Td textAlign="center">{procedure.lastName}</Td>
            <Td textAlign="center">{procedure.dni}</Td>
            <Td textAlign="center">{procedure.location}</Td>
            <Td textAlign="center">{procedure.observations}</Td>
            <Td textAlign="center">{procedure.isGenderViolence ? 'Sí' : 'No'}</Td>
            <Td textAlign="center">{procedure.isDomesticViolence ? 'Sí' : 'No'}</Td>
            <Td textAlign="center">{procedure.judicialBody}</Td>
            <Td textAlign="center">{procedure.procedureReport}</Td>
            <Td textAlign="center">{procedure.procedureCompleted ? 'Sí' : 'No'}</Td>
            <Td textAlign="center">{new Date(procedure.createdAt).toLocaleDateString()}</Td>
            <Td textAlign="center">{new Date(procedure.updatedAt).toLocaleDateString()}</Td>
            <Td textAlign="center">
              <Button size="sm" colorScheme="blue" onClick={() => onEdit(procedure)}>Editar</Button>
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
}

export default ProcedureTable;
