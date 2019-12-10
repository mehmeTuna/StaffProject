import React from 'react';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Avatar from '@material-ui/core/Avatar';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
import CreateIcon from '@material-ui/icons/Create';
import InfoIcon from '@material-ui/icons/Info';

import FilterModal from "./Staff/FilterModal";
import StaffDefinitionEditorModal from "./Staff/StaffDefinitionEditorModal";

function UserList(data) {
    let user = data.user;
    return <Box border={1} borderRadius={10} borderColor={"#E5E8E9"} m={2} p={1}>
        <Grid container direction="row" justify="space-between" alignItems="center">
            <Box>
                <Grid container direction="row" justify="flex-start" alignItems="center">
                    <Box marginRight={2} component="div" display="inline">
                        {user.img === undefined
                            ? <Avatar>H</Avatar>
                            : <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg"/>}
                    </Box>
                    <Box>
                        <Grid container direction="row" justify="center" alignItems="center">
                            <Box>
                                <Grid container direction="column" justify="flex-end" alignItems="flex-start">
                                    <Box>
                                        Full Name
                                    </Box>
                                    <Box>
                                        Alias
                                    </Box>
                                </Grid>
                            </Box>
                            <Box marginLeft={1}>
                                <Grid container direction="column" justify="flex-start" alignItems="flex-start">
                                    <Box>
                                        {user.FullName}
                                    </Box>
                                    <Box>
                                        {user.Alias}
                                    </Box>
                                </Grid>
                            </Box>
                        </Grid>
                    </Box>
                </Grid>
            </Box>
            <Box>
                <Grid container direction="row" justify="space-between" alignItems="center">
                    <Button color="primary">
                        <InfoIcon/>
                    </Button>
                    <Button color="primary">
                        <CreateIcon/>
                    </Button>
                    <Button color="secondary">
                        <DeleteIcon/>
                    </Button>
                </Grid>
            </Box>
        </Grid>
        <Box fontSize={12} marginTop={1} fontWeight="fontWeightRegular">
            Begin Time: 23 Aralık 2019 19:47:03
        </Box>
    </Box>;
}

export default class StaffCareerList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userListData: [
                {
                    Alias: "Bulent",
                    FullName: "Bulent Colak",
                    Gender: "Male",
                    CreationTime: "25.10.2019 20:39:42",
                    Password: "Assigned",
                    Staff: "Bulent Colak",
                    Birthday: "25.10.1974",
                    Age: "45",
                    MartialStatus: "Unspesified",
                    Gsm: "0072 7292641",
                    Class: "Boss",
                    Experience: "FOUNDER",
                    Status: "Recruitment",
                    ProcessTime: "25.10.2019 19:47:44"
                }, {
                    Alias: "Bulent",
                    FullName: "Mehmet Tuna",
                    Gender: "Male",
                    CreationTime: "25.10.2019 20:39:42",
                    Password: "Assigned",
                    Staff: "Bulent Colak",
                    Birthday: "25.10.1974",
                    Age: "45",
                    MartialStatus: "Unspesified",
                    Gsm: "0072 7292641",
                    Class: "Boss",
                    Experience: "FOUNDER",
                    Status: "Recruitment",
                    ProcessTime: "25.10.2019 19:47:44"
                }
            ],
        };
    };

    render() {
        const userList = this
            .state
            .userListData
            .map((data, key) => <UserList key={key} user={data}/>);
        return (
            <div
                style={{
                width: '85%',
                margin: "auto",
                marginTop: 10
            }}>
                <Box>
                    <Grid container direction="row" justify="space-between" alignItems="center">
                        <StaffDefinitionEditorModal/>
                        <FilterModal />
                    </Grid>
                </Box>
                <Box>
                    {userList}
                </Box>
            </div>
        )
    }
};

