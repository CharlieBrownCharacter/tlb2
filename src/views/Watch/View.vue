<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <section>
    <v-container>
      <v-data-table
          hide-actions
          :headers="headers"
          :items="goals"
          :loading="loaders.action"
          class="elevation-1"
      >
        <template v-slot:items="props">
          <td>{{ props.item.display_name }}</td>
          <td> {{ props.item.uuid }} </td>
          <td>
            <v-btn
              flat
              @click="openSpecificationDialog(props.item.efficacy_specification)"
            >
              <v-icon>remove_red_eye</v-icon>
            </v-btn>
          </td>
        </template>
      </v-data-table>
    </v-container>

    <v-dialog
        v-model="dialogs.specification"
        width="500"
    >
      <v-card>
        <v-card-title
            class="headline grey lighten-2"
            primary-title
        >
          Especificaçãoes Objetivo
        </v-card-title>

        <v-card-text>
          <template v-for="specification in activeSpecification">
            <div :key="specification + Math.random().toString(36).substring(7)">
              Descrição: {{ specification.description }} <br>
              Schema: {{ specification.schema }} <br>
              Nome: {{ specification.name }} <br>
            </div>
            <v-divider class="my-2"></v-divider>
          </template>
        </v-card-text>
      </v-card>
    </v-dialog>
  </section>
</template>

<script>

	import WATCH from "../../packages/API/watch"

	export default {
    data(){
      return {
				headers: [
					{ text: 'Display Energy', sortable: true, value: 'display_name' },
					{ text: 'ID', value: 'uuid' },
					{ text: 'Especificações', value: 'efficacy_specification' },
					{ text: '', value: '' },
				],
        activeSpecification: [
					{
						"description": "The total number of enabled compute nodes.",
						"schema": "Range(min=0, max=None, min_included=True, max_included=True, msg=None)",
						"name": "compute_nodes_count",
						"unit": null
					},
					{
						"description": "The number of compute nodes to be released.",
						"schema": "Range(min=0, max=None, min_included=True, max_included=True, msg=None)",
						"name": "released_compute_nodes_count",
						"unit": null
					},
					{
						"description": "The number of VM migrations to be performed.",
						"schema": "Range(min=0, max=None, min_included=True, max_included=True, msg=None)",
						"name": "instance_migrations_count",
						"unit": null
					}
				],
        goals: [
				{
					"links": [
						{
							"href": "http://localhost:9322/v1/goals/ffce96a2-3723-480b-b1d2-7e903b176e73",
							"rel": "self"
						},
						{
							"href": "http://localhost:9322/goals/ffce96a2-3723-480b-b1d2-7e903b176e73",
							"rel": "bookmark"
						}
					],
					"display_name": "Saving Energy",
					"uuid": "ffce96a2-3723-480b-b1d2-7e903b176e73",
					"efficacy_specification": [
						{
							"description": "The total number of enabled compute nodes.",
							"schema": "Range(min=0, max=None, min_included=True, max_included=True, msg=None)",
							"name": "compute_nodes_count",
							"unit": null
						},
						{
							"description": "The number of compute nodes to be released.",
							"schema": "Range(min=0, max=None, min_included=True, max_included=True, msg=None)",
							"name": "released_compute_nodes_count",
							"unit": null
						},
						{
							"description": "The number of VM migrations to be performed.",
							"schema": "Range(min=0, max=None, min_included=True, max_included=True, msg=None)",
							"name": "instance_migrations_count",
							"unit": null
						}
          ],
					"name": "saving_energy"
				},
				{
					"links": [
						{
							"href": "http://localhost:9322/v1/goals/74bae86c-7340-4b28-9a2b-14297dac66ce",
							"rel": "self"
						},
						{
							"href": "http://localhost:9322/goals/74bae86c-7340-4b28-9a2b-14297dac66ce",
							"rel": "bookmark"
						}
					],
					"display_name": "Dummy goal",
					"uuid": "74bae86c-7340-4b28-9a2b-14297dac66ce",
					"efficacy_specification": [],
					"name": "dummy"
				},
				{
					"links": [
						{
							"href": "http://localhost:9322/v1/goals/212f54ab-1097-4833-b8d3-b5a70dcd1af7",
							"rel": "self"
						},
						{
							"href": "http://localhost:9322/goals/212f54ab-1097-4833-b8d3-b5a70dcd1af7",
							"rel": "bookmark"
						}
					],
					"display_name": "Noisy Neighbor",
					"uuid": "212f54ab-1097-4833-b8d3-b5a70dcd1af7",
					"efficacy_specification": [],
					"name": "noisy_neighbor"
				},
				{
					"links": [
						{
							"href": "http://localhost:9322/v1/goals/d3db9e9b-d00d-4b98-a566-caccb7be56e5",
							"rel": "self"
						},
						{
							"href": "http://localhost:9322/goals/d3db9e9b-d00d-4b98-a566-caccb7be56e5",
							"rel": "bookmark"
						}
					],
					"display_name": "Server Consolidation",
					"uuid": "d3db9e9b-d00d-4b98-a566-caccb7be56e5",
					"efficacy_specification": [
						{
							"schema": "{\"minimum\": 0, \"type\": \"integer\"}",
							"name": "compute_nodes_count",
							"unit": null,
							"description": "The total number of enabled compute nodes."
						},
						{
							"schema": "{\"minimum\": 0, \"type\": \"integer\"}",
							"name": "released_compute_nodes_count",
							"unit": null,
							"description": "The number of compute nodes to be released."
						},
						{
							"schema": "{\"minimum\": 0, \"type\": \"integer\"}",
							"name": "instance_migrations_count",
							"unit": null,
							"description": "The number of VM migrations to be performed."
						}
					],
					"name": "server_consolidation"
				},
				{
					"links": [
						{
							"href": "http://localhost:9322/v1/goals/1d4083b6-389b-4760-833d-fd5c6fa4ed6e",
							"rel": "self"
						},
						{
							"href": "http://localhost:9322/goals/1d4083b6-389b-4760-833d-fd5c6fa4ed6e",
							"rel": "bookmark"
						}
					],
					"display_name": "Thermal Optimization",
					"uuid": "1d4083b6-389b-4760-833d-fd5c6fa4ed6e",
					"efficacy_specification": [],
					"name": "thermal_optimization"
				},
				{
					"links": [
						{
							"href": "http://localhost:9322/v1/goals/ae4545bd-cf7a-4d1f-8da2-23dce5b2ffff",
							"rel": "self"
						},
						{
							"href": "http://localhost:9322/goals/ae4545bd-cf7a-4d1f-8da2-23dce5b2ffff",
							"rel": "bookmark"
						}
					],
					"display_name": "Airflow Optimization",
					"uuid": "ae4545bd-cf7a-4d1f-8da2-23dce5b2ffff",
					"efficacy_specification": [],
					"name": "airflow_optimization"
				},
				{
					"links": [
						{
							"href": "http://localhost:9322/v1/goals/9bfe2e95-f9b9-4188-9ddd-7e796dba127e",
							"rel": "self"
						},
						{
							"href": "http://localhost:9322/goals/9bfe2e95-f9b9-4188-9ddd-7e796dba127e",
							"rel": "bookmark"
						}
					],
					"display_name": "Unclassified",
					"uuid": "9bfe2e95-f9b9-4188-9ddd-7e796dba127e",
					"efficacy_specification": [],
					"name": "unclassified"
				},
				{
					"links": [
						{
							"href": "http://localhost:9322/v1/goals/4ca1be89-1ea8-4fcd-bb5d-64b8acaa680c",
							"rel": "self"
						},
						{
							"href": "http://localhost:9322/goals/4ca1be89-1ea8-4fcd-bb5d-64b8acaa680c",
							"rel": "bookmark"
						}
					],
					"display_name": "Hardware Maintenance",
					"uuid": "4ca1be89-1ea8-4fcd-bb5d-64b8acaa680c",
					"efficacy_specification": [
						{
							"schema": "{\"minimum\": 0, \"type\": \"integer\"}",
							"name": "live_migrate_instance_count",
							"unit": null,
							"description": "The number of instances actually live migrated."
						},
						{
							"schema": "{\"minimum\": 0, \"type\": \"integer\"}",
							"name": "planned_live_migrate_instance_count",
							"unit": null,
							"description": "The number of instances planned to live migrate."
						},
						{
							"schema": "{\"minimum\": 0, \"type\": \"integer\"}",
							"name": "cold_migrate_instance_count",
							"unit": null,
							"description": "The number of instances actually cold migrated."
						},
						{
							"schema": "{\"minimum\": 0, \"type\": \"integer\"}",
							"name": "planned_cold_migrate_instance_count",
							"unit": null,
							"description": "The number of instances planned to cold migrate."
						},
						{
							"schema": "{\"minimum\": 0, \"type\": \"integer\"}",
							"name": "volume_migrate_count",
							"unit": null,
							"description": "The number of detached volumes actually migrated."
						},
						{
							"schema": "{\"minimum\": 0, \"type\": \"integer\"}",
							"name": "planned_volume_migrate_count",
							"unit": null,
							"description": "The number of detached volumes planned to migrate."
						},
						{
							"schema": "{\"minimum\": 0, \"type\": \"integer\"}",
							"name": "volume_update_count",
							"unit": null,
							"description": "The number of attached volumes actually migrated."
						},
						{
							"schema": "{\"minimum\": 0, \"type\": \"integer\"}",
							"name": "planned_volume_update_count",
							"unit": null,
							"description": "The number of attached volumes planned to migrate."
						}
					],
					"name": "hardware_maintenance"
				},
				{
					"links": [
						{
							"href": "http://localhost:9322/v1/goals/ddda7902-34e1-416a-9f3c-fc3fd9c25975",
							"rel": "self"
						},
						{
							"href": "http://localhost:9322/goals/ddda7902-34e1-416a-9f3c-fc3fd9c25975",
							"rel": "bookmark"
						}
					],
					"display_name": "Cluster Maintaining",
					"uuid": "ddda7902-34e1-416a-9f3c-fc3fd9c25975",
					"efficacy_specification": [],
					"name": "cluster_maintaining"
				},
				{
					"links": [
						{
							"href": "http://localhost:9322/v1/goals/6b79d570-7fa8-4fca-b4a0-3fe0886e12df",
							"rel": "self"
						},
						{
							"href": "http://localhost:9322/goals/6b79d570-7fa8-4fca-b4a0-3fe0886e12df",
							"rel": "bookmark"
						}
					],
					"display_name": "Workload Balancing",
					"uuid": "6b79d570-7fa8-4fca-b4a0-3fe0886e12df",
					"efficacy_specification": [
						{
							"schema": "{\"minimum\": 0, \"type\": \"integer\"}",
							"name": "instance_migrations_count",
							"unit": null,
							"description": "The number of VM migrations to be performed."
						},
						{
							"schema": "{\"minimum\": 0, \"type\": \"integer\"}",
							"name": "instances_count",
							"unit": null,
							"description": "The total number of audited instances in strategy."
						},
						{
							"schema": "{\"minimum\": 0, \"type\": \"number\"}",
							"name": "standard_deviation_after_audit",
							"unit": null,
							"description": "The value of resulted standard deviation."
						},
						{
							"schema": "{\"minimum\": 0, \"type\": \"number\"}",
							"name": "standard_deviation_before_audit",
							"unit": null,
							"description": "The value of original standard deviation."
						}
					],
					"name": "workload_balancing"
				}
			],
        loaders: {action: false, specificationDialog: false},
        dialogs: {specification: false}
      }
    },
    methods: {
			openSpecificationDialog(specification){
        this.activeSpecification = specification;
        this.dialogs.specification = true;
        this.loaders.specificationDialog = true;
      }
    },
    computed: {
    },
    created() {}
	}
</script>
