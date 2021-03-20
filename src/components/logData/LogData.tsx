import * as React from 'react';
import { Stack, IStackStyles, IStackTokens } from 'office-ui-fabric-react/lib/Stack';
import { mergeStyles, DefaultPalette } from 'office-ui-fabric-react/lib/Styling';
import { PrimaryButton } from 'office-ui-fabric-react';
import { Pivot, PivotItem, PivotLinkSize } from 'office-ui-fabric-react/lib/Pivot';
import { Label } from 'office-ui-fabric-react/lib/Label';
import '../../assets/scss/App.scss';


const commonInfoStackTokens: IStackTokens = {
    childrenGap: 2
};

const commonInfoStackStyles: IStackStyles = {
    root: {
        // background: initial,
    },
};

const commonInfoStackItemStyles = mergeStyles({
    background: '#faf9f8',
    color: DefaultPalette.black,
    font:'Noto Sans',
    minWidth: 300,
    height: 25,
    paddingTop: 5,
    paddingLeft: 5,
    paddingRight: 5,
    fontWeight: 500
});

const commonInfoStackItemStylesLabel = mergeStyles({
    background: '#faf9f8',
    color: DefaultPalette.black,
    font:'Noto Sans',
    minWidth: 150,
    height: 25,
    paddingTop: 5,
    paddingLeft: 5,
    paddingRight: 5,
    fontWeight: 500
});


const infoStackItemStyles = mergeStyles({
    background: '#edebe9',
    color: DefaultPalette.black,
    font:'Noto Sans',
    fontWeight: 500,
    padding: 10,
    width: '100%'
});

const infoStackItemStylesLabel = mergeStyles({
    background: '#4c545b',
    color: DefaultPalette.white,
    font:'Noto Sans',
    minWidth: 150,
    padding: 10,
    fontWeight: 500
});

export default function LogData(props) {
    const { graphLog, restLog, mailboxGuid, tenantId,
        appId, deploymentRing, entityCommand, restAction,
        graphStatusCode, restStatus, entityStatus } = props.logData;

    const basicLogsData = [{ name: "Mailbox GUID", value: mailboxGuid },
    { name: "Tenant Id", value: tenantId },
    { name: "App Id", value: appId },
    { name: "Deployment Ring", value: deploymentRing },
    { name: "Entity Command", value: entityCommand }
    ];

    const basicLogsStatus = [{ name: "REST Action", value: restAction },
    { name: "Graph Status Code", value: graphStatusCode },
    { name: "REST Status", value: restStatus },
    { name: "Entity Status", value: entityStatus }
    ];

    const overviewData = [{ name: "RequestId", value: restLog.RequestId },
    { name: "Graph Stacktrace", value: graphLog.message },
    { name: "ExceptionName", value: restLog.ExceptionName },
    { name: "ExceptionDetails", value: restLog.ExceptionDetails }
    ];

    const graphData = [{ name: "Correlation Id", value: graphLog.correlationId },
    { name: "Incoming URI", value: graphLog.incomingUri },
    { name: "Api version", value: graphLog.apiVersion },
    { name: "Request Method", value: graphLog.requestMethod },
    { name: "Target URI", value: graphLog.targetUri },
    { name: "Response Status Code", value: graphLog.responseStatusCode },
    { name: "Stacktrace", value: graphLog.message },
    { name: "User agent", value: graphLog.userAgent },
    { name: "Client Request Header", value: graphLog.ClientRequestHeader },
    { name: "Response Headers", value: graphLog.responseHeaders },
    ];

    const restData = [{ name: "Env Name", value: restLog.env_name },
    { name: "Env Cloud Name", value: restLog.env_cloud_name },
    { name: "Build version", value: restLog.buildVersion },
    { name: "Action", value: restLog.Action },
    { name: "Status Code", value: restLog.protocolStatusCode },
    { name: "Result Type", value: restLog.ResultType },
    { name: "Exception Name", value: restLog.ExceptionName },
    { name: "Exception Details", value: restLog.ExceptionDetails },
    { name: "Return Code", value: restLog.ReturnCode },
    ];

    const result = (data, index) => {
        return (
            <Stack horizontal styles={commonInfoStackStyles} tokens={commonInfoStackTokens}>
                <span className={commonInfoStackItemStylesLabel}> {data.name} </span>
                <span className={commonInfoStackItemStyles}>  {data.value}</span>
            </Stack>
        );
    }

    return (
        <div>
            <Stack id="results-data" tokens={{ childrenGap: 20 }}>
                <Stack horizontal tokens={{ childrenGap: 30 }}>
                    <Stack tokens={commonInfoStackTokens}>
                        {basicLogsData.map((data, index) => {
                            return result(data, index);
                        })}
                    </Stack>
                    <Stack tokens={commonInfoStackTokens}>
                        {basicLogsStatus.map((data, index) => {
                            return result(data, index);
                        })
                        }
                    </Stack>
                </Stack>

                <Stack horizontal tokens={{ childrenGap: 10 }}>
                    <PrimaryButton text="Report to Calendar API Shield" styles={{ root: { width: 'auto', backgroundColor: 'rgb(0, 120, 212)', borderRadius: '7px', fontSize: '16px', border: 'none', height: 35, lineHeight: 35 } }} />
                    <PrimaryButton text="Create a Workitem" styles={{ root: { width: 'auto', backgroundColor: 'rgb(0, 120, 212)', borderRadius: '7px', fontSize: '16px', border: 'none', height: 35, lineHeight: 35 } }} />
                    <PrimaryButton text="Update a Workitem" styles={{ root: { width: 'auto', backgroundColor: 'rgb(0, 120, 212)', borderRadius: '7px', fontSize: '16px', border: 'none', height: 35, lineHeight: 35 } }} />
                </Stack>

                <Stack styles={{ root: { border: '2px solid #797775', paddingLeft: 10, paddingRight: 10, paddingTop: 5 } }}>
                    <Pivot linkSize={PivotLinkSize.large}>
                        <PivotItem headerText="Overview">
                            <Label>
                                <Stack tokens={commonInfoStackTokens}>
                                    {overviewData.map((data) => {
                                        return (
                                            <Stack horizontal styles={commonInfoStackStyles} tokens={commonInfoStackTokens}>
                                                <span className={infoStackItemStylesLabel}> {data.name} </span>
                                                <span className={infoStackItemStyles}>  {data.value}  </span>
                                            </Stack>
                                        )
                                    })}
                                </Stack>
                            </Label>
                        </PivotItem>
                        <PivotItem headerText="Graph">
                            <Label>
                                <Stack tokens={commonInfoStackTokens}>
                                    {graphData.map((data) => {
                                        return (<Stack horizontal styles={commonInfoStackStyles} tokens={commonInfoStackTokens}>
                                            <span className={infoStackItemStylesLabel}> {data.name} </span>
                                            <span className={infoStackItemStyles}>  {data.value}  </span>
                                        </Stack>)
                                    })}
                                </Stack>
                            </Label>
                        </PivotItem>

                        <PivotItem headerText="REST">
                            <Label>
                                <Stack tokens={commonInfoStackTokens}>
                                    {restData.map((data) => {
                                        return (
                                            <Stack horizontal styles={commonInfoStackStyles} tokens={commonInfoStackTokens}>
                                                <span className={infoStackItemStylesLabel}> {data.name} </span>
                                                <span className={infoStackItemStyles}>  {data.value}  </span>
                                            </Stack>
                                        )
                                    })}
                                </Stack>
                            </Label>
                        </PivotItem>
                    </Pivot>
                </Stack>
            </Stack>
        </div>
    )
}
